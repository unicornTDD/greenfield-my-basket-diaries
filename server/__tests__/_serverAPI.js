const request = require("supertest");
const app = require("../src/app");
const db = require("../src/knex");

describe("Express App", () => {
  beforeAll(async () => {
    // Run migrations and seed data
    await db.migrate.latest();
    await db.seed.run();
  });
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
    it("should receive a 400 status if INVALID email format", async () => {
      const payload = {
        email: "unicornsAreAwesomeTeremail.com",
        password: "unicorn",
      };
      const response = await request(app)
        .post("/create_user")
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Invalid Email Format");
    });
  });
  describe("POST /verify_user", () => {
    it("should receive a 400 if invalid EMAIL format", async () => {
      const payloadCreate = {
        email: "angela.sakic@yahoo.com",
        password: "unicorn",
      };
      const payload = { email: "angela.sakicyahoo.com", password: "unicorn" };
      await request(app) //create User
        .post("/create_user")
        .send(payloadCreate)
        .expect(201);

      const response = await request(app)
        .post("/verify_user")
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Invalid Email Format");
    });
  });
  describe("POST /verify_user", () => {
    it("should login succesfully", async () => {
      const payload = {
        email: "Dominik.sakic@yahoo.com",
        password: "123",
      };
      const response = await request(app)
        .post("/verify_user")
        .send(payload)
        .expect(200);

      console.log(response);

      // expect(response.body.message).toBe("Login succesfull!");
      // expect(response.body.hasOwnProperty("user")).toBe(true);
    });
  });
});
