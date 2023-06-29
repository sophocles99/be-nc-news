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

describe("PATCH /api/comments/:comment_id", () => {
  test("200: increments a given comments's votes when passed newVote object with positive number", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 1,
      },
    };
    return request(app)
      .patch("/api/comments/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 17,
          created_at: "2020-04-06T12:17:00.000Z",
        });
      });
  });
  test("200: decrements a given comments's votes when passed newVote object with negative number", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: -10,
      },
    };
    return request(app)
      .patch("/api/comments/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 6,
          created_at: "2020-04-06T12:17:00.000Z",
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
      .patch("/api/comments/1")
      .send(testVoteIncrement)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).not.toHaveProperty("extra_nonsense");
      });
  });
  test("404: returns error if comment_id not found", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 50,
      },
    };
    return request(app)
      .patch("/api/comments/19")
      .send(testVoteIncrement)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error if comment_id cannot be cast as number", () => {
    const testVoteIncrement = {
      newVote: {
        inc_votes: 50,
      },
    };
    return request(app)
      .patch("/api/comments/pineapple")
      .send(testVoteIncrement)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: delete comment with given comment_id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("404: returns error when comment_id not found", () => {
    return request(app)
      .delete("/api/comments/20")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: returns error when comment_id cannot be cast to correct data type", () => {
    return request(app)
      .delete("/api/comments/pineapples")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
