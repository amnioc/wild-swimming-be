export {};

const testData = require("../data/test-data");
const seedDB = require("./seed");
const mongoose = require("mongoose");

const runSeed = () => {
  return seedDB(testData).then(() => mongoose.connection.end());
};

runSeed();
