const request = require("supertest");

const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpointsFile = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("responds with object describing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toMatchObject(endpointsFile);
      });
  });
});

describe("return 404 for invalid endpoint", () => {
  test("return 404 for invalid endpoint", () => {
    return request(app).get("/api/notanendpoint").expect(404).then(({body})=>
    expect(body.msg).toBe("Not found"));
  });
});
