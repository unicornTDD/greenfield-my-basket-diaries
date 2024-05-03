//imports
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const { describe } = require("mocha");
const expect = chai.expect;

//set up
const server = setupServer();

describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  it("should send status 401", async () => {
    const res = await request.get(`/diaries`);
    expect(res).have.status(401);
  });
});
