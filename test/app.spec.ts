const app = require("../app.ts");
const connection = require("../db/connection.ts");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Comments = require("../models/commentModel.ts");
const { seedDB } = require("../db/seeds/seed.ts");
const seedComments = require("../db/data/test-data.ts");
const each = require("chai-each");
const chai = require("chai");
const { expect } = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);

describe("Comments", () => {
  beforeEach(async () => {
    mongoose.connect(process.env.DATABASE_URL);
    seedDB();
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
          expect(comments.length).to.equal(10);
          expect(comments[0]).to.have.property("body").to.be.a("string");
          expect(comments[0]).to.have.property("name").to.be.a("string");
          expect(comments[0]).to.have.property("location_id").to.be.a("string");
          expect(comments[0]).to.have.property("votes").to.be.a("number");
          expect(comments[0]).to.have.property("created_at").to.be.a("string");
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
        .post("/api/comments")
        .send(newComment)
        .then((res) => {
          expect(res.status).to.equal(201);
          const { comment } = res.body;
          expect(comment).to.have.property("body").to.be.a("string");
          expect(comment).to.have.property("created_at").to.be.a("string");
          expect(comment).to.have.property("name").to.be.a("string");
          expect(comment).to.have.property("votes").to.be.a("number");
          expect(comment).to.have.property("location_id").to.be.a("string");
          expect(comment).to.have.property("_id").to.be.a("string"); // comment_id
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe("GET /api/comments/:comment_id", () => {
    it.only("200 - responds with comment by comment_id", () => {
      return chai
        .request(app)
        .get("/api/comments/6454e260d5ccba8bd17a7a91")
        .then((res) => {
          res.status.should.be.equal(200);
          const { comment } = res.body;
          expect(comment).to.have.property("body").to.equal("strong recommend");

          expect(comment).to.have.property("created_at").to.be.a("string");
          expect(comment).to.have.property("name").to.equal("swimmer_name");
          expect(comment).to.have.property("votes").to.equal(0);
          expect(comment)
            .to.have.property("location_id")
            .to.equal("id_incoming");
        });
    });
  });
});
