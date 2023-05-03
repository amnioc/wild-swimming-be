const app = require("../app.ts");
const mocha = require("mocha");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
var { assert, expect } = require("chai");
var should = require("chai").should();
let chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

beforeEach((done) => {
  return seed();
});

afterAll(() => {
  mongoose.connection.end();
});

describe("GET /api/comments", () => {
  it("returns all comments", (done) => {
    chai
      .request(server)
      .get("/api/comments")
      .end((err, response) => {
        response.should.have.status(200);
      });
  });
});
