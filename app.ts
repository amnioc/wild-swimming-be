// export {};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Comment = require("./models/commentModel.ts");
const { getAllComments, addCommentsByLocation } = require("./controllers/comments_controllers.ts");

app.get("/api/comments", getAllComments);
app.post("/api/comments", addCommentsByLocation )
module.exports = app;
