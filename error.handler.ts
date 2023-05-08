const express = require("express");
const app = require("./app.ts");

function MongooseErrors(err, req, res, next) {
  if (err.name === "CastError" && err.path === "_id") {
    return res.status(404).send({ msg: "Comment Does Not Exist" });
  } else if (err.name === "CastError") {
    return res.status(400).send({ msg: "Invalid Parameter Provided" });
  }
  next(err);
}

function CustomErrors(err, req, res, next) {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  next(err);
}

function error500Handler(err, req, res, next) {
  console.log(err);
  return res.status(500).send({ error: err });
}

module.exports = { CustomErrors, MongooseErrors, error500Handler };
