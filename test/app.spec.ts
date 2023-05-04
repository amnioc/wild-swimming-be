const app = require("../app.ts");
const connection = require("../db/connection.ts");
const mongoose = require("mongoose");

let should = require("chai").should();

const { seedDB } = require("../db/seeds/seed.ts");

const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);

beforeEach((done) => {
  mongoose.connection.collections.comments.drop(() => {
    // seedDB();
    done();
  });
});

afterEach(() => {
  mongoose.connection.close();
});

////////////
describe.only("GET /api/comments", () => {
  it("200 - should return all comments", () => {
    chai
      .request(app)
      .get("/api/comments")
      .end((err, response) => {
        response.should.have.status(200);
      });
  });
});
////////////////

describe("POST /api/comments", () => {
  it("200 - should respond with the correct status code and the comment returned in the response", () => {
    return request(app)
      .post("/api/comments")
      .send({
        body: "Nice place to swim",
        name: "swimmerone",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.comment).to.have.property("body").to.be.a("string");
        expect(res.body.comment)
          .to.have.property("created_at")
          .to.be.a("string");
        expect(res.body.comment).to.have.property("username").to.be.a("string");
      });
  });
});
describe("GET /api/comments", () => {
  it("200 - should respond with the correct status code and the comment returned in the response", () => {
    return chai
      .request(app)
      .get("/api/comments/644a77996020cec0a56ff540")
      .then((res) => {
        expect(res.body.comment).to.have.property("body").to.be.a("string");
        expect(res.body.comment)
          .to.have.property("created_at")
          .to.be.a("string");
        expect(res.body.comment).to.have.property("username").to.be.a("string");
      });
  });
});
