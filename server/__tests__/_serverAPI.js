const request = require("supertest");
const app = require("../src/app");
const knex = require("../knexfile");

describe("Express App", () => {
  describe("POST /create_user", () => {
    it("should receive a 201 status upon success", async () => {
      const payload = { email: "dominik.sakic@yahoo.com", password: "unicorn" };
      const response = await request(app)
        .post("/create_user")
        .send(payload)
        .expect(201);

      expect(response.body.message).toBe("Account created!");
    });
    it("should receive a 409 status if eamil already exist", async () => {
      const payload = {
        email: "unicornsAreAwesomeTer@email.com",
        password: "unicorn",
      };
      const response = await request(app)
        .post("/create_user")
        .send(payload)
        .expect(409);

      expect(response.body.error).toBe("Email already exists");
    });
  });
});
