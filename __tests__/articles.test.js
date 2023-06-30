const request = require("supertest");

const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/articles", () => {
  test("200: returns array of all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(String));

          expect(article).not.toHaveProperty("body");
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles?query", () => {
  test("200: accepts topic query which filters articles by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", "mitch");
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(String));

          expect(article).not.toHaveProperty("body");
        });
      });
  });
  test("200: returns empty array if topic exists but there are no articles with that topic", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(0);
      });
  });
  test("404: returns error if topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=david")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("200: accepts sort_by query (defaults to created_at, defaults to descending order)", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("title", { descending: true });
      });
  });
  test("400: returns error if sort_by column not in databse", () => {
    return request(app)
      .get("/api/articles?sort_by=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("200: accepts order query (descending)", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=desc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("article_id", { descending: true });
      });
  });
  test("200: accepts order query (asscending)", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at");
      });
  });
  test("400: returns error if order query not asc or desc", () => {
    return request(app)
      .get("/api/articles?order=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("200: accepts limit query which limits number of articles returned", () => {
    return request(app)
      .get("/api/articles?limit=5")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(5);
      });
  });
  test("400: returns error if limit cannot be cast to integer", () => {
    return request(app)
      .get("/api/articles?limit=mango")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test(`200: accepts p query which returns requested page number from results,
        with size of page specified by limit query`, () => {
    return request(app)
      .get("/api/articles?limit=5&p=2&sort_by=article_id&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(5);
        articles.forEach((article, index) => {
          expect(article).toHaveProperty("article_id", index + 1 + 5);
        });
      });
  });
  test(`200: for p query, limit defaults to 10 if not specified`, () => {
    return request(app)
      .get("/api/articles?&p=2&sort_by=article_id&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(3);
        articles.forEach((article, index) => {
          expect(article).toHaveProperty("article_id", index + 1 + 10);
        });
      });
  });
  test(`200: for p query, returns empty array when page is empty`, () => {
    return request(app)
      .get("/api/articles?&p=3&sort_by=article_id&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(0);
      });
  });
  test("400: returns error if p cannot be cast to integer", () => {
    return request(app)
      .get("/api/articles?p=mango")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("200: each article object has total_count property showing count of total query results before limit is applied", () => {
    return request(app)
      .get("/api/articles?topic=mitch&limit=5")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(5);
        articles.forEach((article) => {
          expect(article).toHaveProperty("total_count", "12");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns article object by id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("200: article includes comment_count property", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("comment_count", "11");
      });
  });
  test("404: returns error if no matching article_id found", () => {
    return request(app)
      .get("/api/articles/20")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if invalid article_id parameter given", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("POST /api/articles", () => {
  test("201: returns successfully created article", () => {
    const testArticle = {
      newArticle: {
        author: "rogersop",
        title: "Holidaying in Wigan",
        body: "Up with the in-laws, coding all day",
        topic: "paper",
        article_img_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          article_id: 14,
          title: "Holidaying in Wigan",
          topic: "paper",
          author: "rogersop",
          body: "Up with the in-laws, coding all day",
          created_at: expect.any(String),
          votes: 0,
          article_img_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          comment_count: 0,
        });
      });
  });
  test("201: article_img_url is set to default if not provided", () => {
    const testArticle = {
      newArticle: {
        author: "rogersop",
        title: "Holidaying in Wigan",
        body: "Up with the in-laws, coding all day",
        topic: "paper",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty(
          "article_img_url",
          "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"
        );
      });
  });
  test("201: ignores unnecessary properties in newArticle object", () => {
    const testArticle = {
      newArticle: {
        author: "rogersop",
        title: "Holidaying in Wigan",
        body: "Up with the in-laws, coding all day",
        topic: "paper",
        extra_nonsense: "not required at all",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).not.toHaveProperty("extra_nonsense");
      });
  });
  test("404: returns error if author not in users table", () => {
    const testArticle = {
      newArticle: {
        author: "barry_manilow",
        title: "Holidaying in Wigan",
        body: "Up with the in-laws, coding all day",
        topic: "paper",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(404)
      .then(({ body }) => {
        const { article } = body;
        expect(body.msg).toBe("Not found");
      });
  });
  test("404: returns error if topic not in topics table", () => {
    const testArticle = {
      newArticle: {
        author: "butter_bridge",
        title: "Holidaying in Wigan",
        body: "Up with the in-laws, coding all day",
        topic: "holidays",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(404)
      .then(({ body }) => {
        const { article } = body;
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if article is malformed", () => {
    const testArticle = {
      newArticle: {
        dodgyKey1: "franklin_d",
        dodgyKey2: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles")
      .send(testArticle)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: returns array of comments for given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(11);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id", expect.any(Number));
        });
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200: returns empty array if article_id exists but article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(0);
      });
  });
  test("404: returns error if no matching article_id found", () => {
    return request(app)
      .get("/api/articles/20/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if invalid article_id parameter given", () => {
    return request(app)
      .get("/api/articles/mango/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("201: returns the successfully created comment", () => {
    const testComment = {
      newComment: {
        username: "butter_bridge",
        body: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(testComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("article_id", expect.any(Number));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("created_at", expect.any(String));
      });
  });
  test("201: ignores any extra properties in posted object", () => {
    const testComment = {
      newComment: {
        username: "butter_bridge",
        body: "Bemused of Basingstoke. What is this guy on?",
        irrelevant1: "totally out of place",
        irrelevant2: 42,
      },
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(testComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).not.toHaveProperty("irrelevant1");
        expect(comment).not.toHaveProperty("irrelevant2");
      });
  });
  test("404: returns error if article_id doesn't exist", () => {
    const testComment = {
      newComment: {
        username: "butter_bridge",
        body: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles/14/comments")
      .send(testComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("404: returns error if username doesn't exist", () => {
    const testComment = {
      newComment: {
        username: "franklin_d",
        body: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if article_id cannot be cast to integer", () => {
    const testComment = {
      newComment: {
        username: "butter_bridge",
        body: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles/banana/comments")
      .send(testComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: returns error if posted comment is malformed", () => {
    const testComment = {
      newComment: {
        dodgyKey1: "franklin_d",
        dodgyKey2: "Bemused of Basingstoke. What is this guy on?",
      },
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(testComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH: /api/articles/:article_id", () => {
  test("200: increments a given article's votes when passed newVote object with positive number", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 1,
      },
    };
    return request(app)
      .patch("/api/articles/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 101,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("200: decrements a given article's votes when passed newVote object with negative number", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: -50,
      },
    };
    return request(app)
      .patch("/api/articles/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 50,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("200: ignores unnecessary properties in newVote object", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 50,
        extra_nonsense: "why am I even here?",
      },
    };
    return request(app)
      .patch("/api/articles/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).not.toHaveProperty("extra_nonsense");
      });
  });
  test("404: returns error if article_id not found", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 50,
      },
    };
    return request(app)
      .patch("/api/articles/14")
      .send(testVoteIncrement)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if article_id cannot be cast to integer", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 50,
      },
    };
    return request(app)
      .patch("/api/articles/banana")
      .send(testVoteIncrement)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: returns error if newVote object malformed", () => {
    const testVoteIncrement = {
      newVote: {
        these_aint_no_votes: 50,
      },
    };
    return request(app)
      .patch("/api/articles/1")
      .send(testVoteIncrement)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: returns error if inc_votes cannot be cast to integer", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: "fifty",
      },
    };
    return request(app)
      .patch("/api/articles/1")
      .send(testVoteIncrement)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
