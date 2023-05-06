// export {};
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Comments = require("./models/commentModel.ts");
const {
  getAllComments,
  addComments,
  getCommentById,
  getCommentsByLocation,
  deleteCommentById,
} = require("./controllers/comments_controllers.ts");

app.use(express.json());

app.get("/api/comments", getAllComments);
app.post("/api/comments", addComments);
app.get("/api/comments/:_id", getCommentById); //comment_id provided by mongoDB
app.get("/api/comments/location/:location_id", getCommentsByLocation);
app.delete("/api/comments/:_id", deleteCommentById);
module.exports = app;
