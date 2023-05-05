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

exports.insertComment = (newComment) => {
  const addComment = Comments.create(newComment);
  return addComment.then((result) => {
    return result[0];
  });
};

exports.selectCommentById = (comment_id) => {
  const selectComment = Comments.find({ _id: `${comment_id}` });
  return selectComment.then((result) => {
    return result[0];
  });
};
