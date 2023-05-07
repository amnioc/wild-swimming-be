const app = require("../app.ts");
const connection = require("../db/connection.ts");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Comments = require("../models/commentModel.ts");
const { seedDB } = require("../db/seeds/seed.ts");
const seedComments = require("../db/data/test-data.ts");
const chai = require("chai");
const { expect } = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const request = require("supertest");
chai.use(chaiHttp);

describe("Comments", () => {
  before((done) => {
    mongoose.connect(process.env.DATABASE_URL);
    seedDB();
    done();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("GET /comments", () => {
    it("200 - should return all comments", async () => {
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
        });
      // .catch((err) => {
      //   console.log(err);
      // });
    });
    it.skip("404", () => {
      //error handling to follow
    });
  });

  describe("POST /api/comments", async () => {
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
        });
      // .catch((err) => {
      //   console.log(err);
      // });
    });
  });

  describe("GET /api/comments/:comment_id", () => {
    it("200 - responds with comment by comment_id", async () => {
      return chai
        .request(app)
        .get("/api/comments/644a77996020cec0a56ff540") // this changes every reseed
        .then((res) => {
          res.status.should.be.equal(200);
          const { comment } = res.body;
          expect(comment).to.have.property("body").to.equal("love a swim I do");
          expect(comment).to.have.property("created_at").to.be.a("string");
          expect(comment).to.have.property("name").to.equal("swimmer123");
          expect(comment).to.have.property("votes").to.equal(0);
          expect(comment)
            .to.have.property("location_id")
            .to.equal("id_incoming");
        });
      // .catch((err) => {
      //   console.log("test error by comment_id");
      //   console.log(err);
      // });
    });
  });

  describe("GET /api/comments/:location_id", () => {
    it("200 - returns array of comments for location_id", async () => {
      return chai
        .request(app)
        .get("/api/comments/location/ukd5400-40750")
        .then((res) => {
          expect(res.status).to.be.equal(200);
          const { comments } = res.body;
          comments.should.be.a("array");
          // expect(comments).to.have.length(2);
          comments.map((comment) => {
            expect(comment).to.have.property("body").to.be.a("string");
            expect(comment).to.have.property("name").to.be.a("string");
            expect(comment).to.have.property("votes").to.equal(0);
            expect(comment)
              .to.have.property("location_id")
              .to.equal("ukd5400-40750");
          });
        });
      // .catch((err) => {
      //   console.log(`there was a test error by location_id`);
      // });
    });
  });

  describe('DELETE "/api/comments/:_id', async () => {
    it("204: should delete comment by ID and return No Content to Client", async () => {
      return chai
        .request(app)
        .delete("/api/comments/64551be995d51aaeb1d8e315")
        .then((res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.be.empty;
        });
    });
  });

  describe("PATCH /api/comments/_id", () => {
    it("200 - should return comment with votes value increased/decreased by 1", () => {
      const testIncVotes = { incVotes: 1 };

      return chai
        .request(app)
        .patch("/api/comments/644a77996020cec0a56ff540")
        .send(testIncVotes)
        .then((res) => {
          const { comment } = res.body;
          console.log(res.body);
          expect(comment).to.be.a("object");
          expect(comment).to.have.property("body").to.be.a("string");
          expect(comment).to.have.property("name").to.equal("swimmer123");
          expect(comment).to.have.property("created_at").to.be.a("string");
          expect(comment)
            .to.have.property("location_id")
            .to.equal("id_incoming");
          expect(comment).to.have.property("votes").to.be.at.least(1);
        });
    });
  });
});
