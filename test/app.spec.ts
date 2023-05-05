const app = require("../app.ts");
const connection = require("../db/connection.ts");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Comments = require("../models/commentModel.ts");
const { seedDB } = require("../db/seeds/seed.ts");

const chai = require("chai");
const { expect } = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);

describe("Comments", () => {
  beforeEach(async () => {
    mongoose.connect(process.env.DATABASE_URL);
    await seedDB;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("GET /comments", () => {
    it("200 - should return all comments", () => {
      return chai
        .request(app)
        .get("/api/comments")
        .then((response) => {
          expect(response).to.have.status(200);
          const { comments } = response.body;
          expect(comments).to.be.a("array");
          expect(comments).to.have.a.lengthOf(10);
          expect(comments[0]).to.have.property("body");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it("404", () => {
      //error handling to follow
    });
  });

  describe("POST /api/comments", () => {
    it("201 - should respond with the correct status code and the comment returned in the response", () => {
      const newComment = {
        body: "Nice place to swim",
        name: "swimmerone",
        location_id: "ukd5400-40750",
      };

      return chai
        .request(app)
        .post("api/comments")
        .send(newComment)

        .then((err, response) => {
          console.log(newComment);
          expect(response.body.comment)
            .to.have.property("body")
            .to.be.a("string");
          expect(response.body.comment)
            .to.have.property("created_at")
            .to.be.a("string");
          expect(response.body.comment)
            .to.have.property("username")
            .to.be.a("string");
        })
        .catch((err) => {
          console.log(err + "<<< POST ERROR");
        });
    });
  });

  ///

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
          expect(res.body.comment)
            .to.have.property("username")
            .to.be.a("string");
        });
    });
  });
});
