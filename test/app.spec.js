// const app = require("../app.ts");
const mongoose = require("mongoose");
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);
const server = require("../db/connection.js");
let should = require("chai").should();
// var { assert, expect } = require("chai");
// const request = require("supertest");

const { seedDB } = require("../db/seeds/seed.js");

const app = require("../app.ts");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);

beforeEach((done) => {
  mongoose.connection.collections.comments.drop(() => {
    seedDB();
    console.log("doing beforeEach");
    done();
  });
});

// afterAll(() => {
//   mongoose.connection.end();
// });

////////////
describe.only("GET /api/comments", () => {
  it("200 - should return all comments", () => {
    chai
      .request(app)
      .get("/api/comments")
      .end((err, response) => {
        response.should.have.status(200);
      })
      .done();
  });
});
////////////////

describe("POST /api/comments", () => {
  it("200 - should respond with the correct status code and the comment returned in the response", () => {
    return request(app)
      .post("/api/comments")
      .send({
        body: "Nice place to swim",
        username: "swimmerone",
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
