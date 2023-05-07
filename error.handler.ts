const express = require("express");
const app = require("./app.ts");

function MongooseErrors(err, req, res, next) {
  if ((res.body.error.name = "CastError")) {
  }
}

function CustomErrors(err, req, res, next) {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
}

function error500Handler(err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: err });
}

module.exports = { CustomErrors, MongooseErrors, error500Handler };
