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
