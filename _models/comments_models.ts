const app = require("../app.ts");
const mongoose = require("mongoose");
const connection = require("../db/connection.ts");
const Comments = require("../models/commentModel.ts");

exports.selectAllComments = () => {
  const allComments = Comments.find();
  return allComments.then((result) => {
    return result;
  });
};

exports.insertLocationComment = (newComment) => {
  // const{ name, body } = newComment;
  return Comments.insertOne(newComment).then((result) => {
    return result;
  });
};
