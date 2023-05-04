const seedComments = require("../data/test-data.ts");
const seedDB = require("./seed.ts");
const mongoose = require("mongoose");

const runSeed = () => {
  return seedDB(seedComments).then(() => mongoose.connection.end());
};

runSeed();
