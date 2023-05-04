// export {};
const app = require("../app.ts");
const mongoose = require("mongoose");
const connection = require("../db/connection.ts");
const Comment = require("../models/commentModel.ts");

exports.selectAllComments = () => {
  const queryString = `select * from Comment`;
  return Comment.find({}).then((result) => {
    console.log(result);
    return result;
  });
};


exports.insertLocationComment =(newComment)=>{

  // const{ name, body } = newComment;
  return Comment.create(newComment).then((result)=>{
    return result;
  })
}
