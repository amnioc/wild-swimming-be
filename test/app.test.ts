import { beforeEach } from "node:test";

const app = require("../app.ts");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const seedComments = require("../db/data/test-data.js");
const server = require("../dist/server.js");
var { assert, expect } = require("chai");
var should = require("chai").should();
let chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

beforeEach((done) => {
  return seed(seedComments);
});

// afterAll(() => {
//   return connection.end();
// });

describe("GET /api/comments", () => {
  it("returns all comments", (done) => {
    chai
      .request(server)
      .get("/api/comments")
      .end(res) => {
        res.should.have.status(200);
      }
    });
  });
