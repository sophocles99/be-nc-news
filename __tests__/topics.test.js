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

describe("GET /api/topics", () => {
  test("responds with array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
  test("responds with error if no topic objects in database", () => {
    return db
      .query(
        `DELETE FROM comments;
         DELETE FROM articles;
         DELETE FROM topics;`
      )
      .then(() => {
        return request(app)
          .get("/api/topics")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not found");
          });
      });
  });
});
