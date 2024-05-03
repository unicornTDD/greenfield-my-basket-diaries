const request = require("supertest");
const app = require("../src/app");

describe("Express App", () => {
  describe("POST /create_user", () => {
    it("should create a new User", async () => {
      const response = await request(app).get("/diaries");
      expect(response.status).toBe(401);
    });

    // Add more tests for the /diaries endpoint
  });
});
