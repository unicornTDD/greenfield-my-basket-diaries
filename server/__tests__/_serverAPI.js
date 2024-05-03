const request = require("supertest");
const app = require("../src/server");

describe("Express App", () => {
  // Test suite for GET /diaries endpoint
  describe("GET /diaries", () => {
    it("should return 401 Unauthorized when not authenticated", async () => {
      const response = await request(app).get("/diaries");
      expect(response.status).toBe(401);
    });

    // Add more tests for the /diaries endpoint
  });
});
