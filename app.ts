const express = require("express");
const app = express();
const {
  getAllComments,
  addComments,
  getCommentById,
  getCommentsByLocation,
  deleteCommentById,
  updateCommentVotes,
} = require("./controllers/comments_controllers.ts");
const {
  CustomErrors,
  error500Handler,
  MongooseErrors,
} = require("./error.handler.ts");

app.use(express.json());

app.get("/api/comments", getAllComments);
app.post("/api/comments", addComments);
app.get("/api/comments/:_id", getCommentById); //_id is comment_id provided by mongoDB
app.get("/api/comments/location/:location_id", getCommentsByLocation);
app.delete("/api/comments/:_id", deleteCommentById);
app.patch("/api/comments/:_id", updateCommentVotes);

//error handling below
app.use(MongooseErrors);
app.use(CustomErrors);
app.use(error500Handler);

module.exports = app;
