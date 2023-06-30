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
});

describe("POST /api/topics", () => {
  test("201: returns the successfully created topic", () => {
    const testTopic = {
      newTopic: {
        slug: "holidays",
        description: "everything and anything about vacations",
      },
    };
    return request(app)
      .post("/api/topics")
      .send(testTopic)
      .expect(201)
      .then(({ body }) => {
        const { topic } = body;
        expect(topic).toHaveProperty("slug", "holidays");
        expect(topic).toHaveProperty(
          "description",
          "everything and anything about vacations"
        );
      });
  });
  test("201: ignores any extra properties in posted object", () => {
    const testTopic = {
      newTopic: {
        slug: "holidays",
        description: "everything and anything about vacations",
        irrelevant1: "totally out of place",
        irrelevant2: 42,
      },
    };
    return request(app)
      .post("/api/topics")
      .send(testTopic)
      .expect(201)
      .then(({ body }) => {
        const { topic } = body;
        expect(topic).not.toHaveProperty("irrelevant1");
        expect(topic).not.toHaveProperty("irrelevant2");
      });
  });
  test("400: returns error if newTopic object is malformed", () => {
    const testTopic = {
      newTopic: {
        wrongProperty1: "bobby",
        wrongProperty2: "bobbies on the beat",
      },
    };
    return request(app)
      .post("/api/topics")
      .send(testTopic)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: returns error if slug already exists", () => {
    const testTopic = {
      newTopic: {
        slug: "mitch",
        description: "bobbies on the beat",
      },
    };
    return request(app)
      .post("/api/topics")
      .send(testTopic)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
