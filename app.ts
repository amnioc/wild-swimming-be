// export {};
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Comments = require("./models/commentModel.ts");
const {
  getAllComments,
  addCommentsByLocation,
} = require("./controllers/comments_controllers.ts");

app.use(express.json());

app.get("/api/comments", getAllComments);
app.post("/api/comments/:location_id", addCommentsByLocation);
module.exports = app;
