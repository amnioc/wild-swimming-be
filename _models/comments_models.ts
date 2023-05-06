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
    return result;
  });
};

exports.selectCommentById = (comment_id) => {
  const selectComment = Comments.find({ _id: `${comment_id}` });
  return selectComment.then((result) => {
    console.log(result);
    return result[0];
  });
};

exports.selectCommentsByLocation = (location_id) => {
  const selectComments = Comments.find({ location_id: `${location_id}` });
  console.log(location_id);
  return selectComments.then((result) => {
    return result;
  });
};

exports.removeCommentById = (comment_id) => {
  const deleteComment = Comments.deleteOne({ _id: `${comment_id}` });
  return deleteComment.then((result) => {
    return result;
  });
};
