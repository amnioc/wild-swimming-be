// const seedComments = require("../data/test-data");
const seedDB = require("./seed.js");
const mongoose = require("mongoose");

const runSeed = () => {
  return seedDB(seedComments).then(() => mongoose.connection.end());
};

runSeed();
