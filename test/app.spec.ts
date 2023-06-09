export {};

const app = require("../app");
const connection = require("../db/connection");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Comments = require("../models/commentModel");
const { seedDB } = require("../db/seeds/seed");
const seedComments = require("../db/data/test-data");
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
          expect(comments[0]).to.have.property("user_id").to.be.a("string");
          expect(comments[0]).to.have.property("avatar_url").to.be.a("string");
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
        avatar_url:
          "https://images.unsplash.com/photo-1683053243792-28e9d984c25a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
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
          expect(comment).to.have.property("user_id").to.be.a("string");
          expect(comment).to.have.property("avatar_url").to.be.a("string");
        });
    });
    it('400 - should respond with correct status code and message "Validation Failed" for incorrect data type', () => {
      const newComment = {
        body: "Nice place to swim",
        name: 1,
      };

      return chai
        .request(app)
        .post("/api/comments")
        .send({ newComment })
        .then((res) => {
          const { msg } = res.body;
          expect(res.status).to.equal(400);
          expect(msg).to.equal("Comments validation failed, please try again");
        });
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
          expect(comment).to.have.property("votes").to.be.a("number");
          expect(comment).to.have.property("user_id").to.be.a("string");
          expect(comment).to.have.property("avatar_url").to.be.a("string");
          expect(comment)
            .to.have.property("location_id")
            .to.equal("id_incoming");
        });
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
            expect(comment).to.have.property("user_id").to.be.a("string");
            expect(comment).to.have.property("avatar_url").to.be.a("string");
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
    it('404: should return "Comment Does Not Exist" for invalid comment_id', () => {
      return chai
        .request(app)
        .delete("/api/comments/1230")
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal("Comment Does Not Exist");
        });
    });
  });

  describe("PATCH /api/comments/_id", () => {
    it("200 - should return comment with votes value increased by 1", () => {
      const testIncVotes = { incVotes: 1 };

      return chai
        .request(app)
        .patch("/api/comments/644a77996020cec0a56ff540")
        .send(testIncVotes)
        .then((res) => {
          const { comment } = res.body;
          expect(res.status).to.equal(200);
          expect(comment).to.be.a("object");
          expect(comment).to.have.property("body").to.be.a("string");
          expect(comment).to.have.property("name").to.equal("swimmer123");
          expect(comment).to.have.property("created_at").to.be.a("string");
          expect(comment).to.have.property("user_id").to.be.a("string");
          expect(comment).to.have.property("avatar_url").to.be.a("string");
          expect(comment)
            .to.have.property("location_id")
            .to.equal("id_incoming");
          expect(comment).to.have.property("votes").to.be.at.least(1);
        });
    });
    it("400: returns error message if incVotes key is missing/null", () => {
      return chai
        .request(app)
        .patch("/api/comments/6457cc9f56d1ec8c95b7f5e9")
        .send({})
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body.msg).to.equal("No Votes Provided");
        });
    });
    it('404: should return "Comment Does Not Exist" for invalid comment_id/_id', () => {
      const testIncVotes = { incVotes: 1 };

      return chai
        .request(app)
        .patch("/api/comments/123")
        .send(testIncVotes)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
          expect(body.msg).to.equal("Comment Does Not Exist");
        });
    });
    it('400: should return "Invalid Parameter Provided" for invalid votes data format', () => {
      const testIncVotes = { incVotes: "one" };

      return chai
        .request(app)
        .patch("/api/comments/6457cc9f56d1ec8c95b7f5e9")
        .send(testIncVotes)
        .then((res) => {
          expect(res.status).to.equal(400);
          const { msg } = res.body;
          expect(msg).to.equal("Invalid Parameter Provided");
        });
    });
  });
});

describe("Ratings", () => {
  let rating;

  beforeEach(() => {
    rating = {
      rating: 1,
      locationId: "uki1106-11940",
      userId: "someuserid12",
    };
  });

  describe("POST /ratings", () => {
    it("201 - should return the posted rating", () => {
      return chai
        .request(app)
        .post("/api/ratings")
        .send(rating)
        .then((res) => {
          expect(res.status).to.equal(201);

          const { rating } = res.body;

          expect(rating).to.have.property("rating").to.be.a("number");
          expect(rating).to.have.property("userId").to.be.a("string");
          expect(rating).to.have.property("locationId").to.be.a("string");
        });
    });

    it('400 - should respond with correct status code and message "Validation Failed" for incorrect number of votes', () => {
      const wrongRating = {
        rating: 20,
        locationId: "uki1106-11940",
        userId: "someuserid1234",
      };

      return chai
        .request(app)
        .post("/api/ratings")
        .send(wrongRating)
        .then((res) => {
          const { msg } = res.body;
          expect(res.status).to.equal(400);
          expect(msg).to.equal("rating validation failed, please try again");
        });
    });

    it('400 - should respond with correct status code and message "Validation Failed" for incorrect fields', () => {
      const wrongRating = {
        rating: 5,
        locationId: "uki1106-11940",
      };

      return chai
        .request(app)
        .post("/api/ratings")
        .send(wrongRating)
        .then((res) => {
          const { msg } = res.body;
          expect(res.status).to.equal(400);

          expect(msg).to.equal("rating validation failed, please try again");
        });
    });
  });

  describe("GET /ratings", () => {
    it("200 - should return all the rating given a location ID", () => {
      return chai
        .request(app)
        .get("/api/ratings/uki1106-11940")
        .then((res) => {
          expect(res.status).to.equal(200);

          const { ratings } = res.body;

          expect(ratings[0]).to.have.property("rating").to.be.a("number");
          expect(ratings[0]).to.have.property("userId").to.be.a("string");
          expect(ratings[0]).to.have.property("locationId").to.be.a("string");
        });
    });

    it("404 - should return 404 if location not found", () => {
      return chai
        .request(app)
        .get("/api/ratings/uki1106-11944")
        .then((res) => {
          const { status, message } = res.body;
          expect(status).to.equal(404);
          expect(message).to.equal("No rating found by that ID");
        });
    });
  });
});
