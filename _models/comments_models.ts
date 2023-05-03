// export {};
const app = require("../app.ts");
const mongoose = require("mongoose");
const connection = require("../db/connection.js");
const Comment = require("../models/commentModel.ts");

exports.selectAllComments = () => {
  const queryString = `select * from Comment`;
  return Comment.find({}).then((result) => {
    console.log(result);
    return result;
  });
};
