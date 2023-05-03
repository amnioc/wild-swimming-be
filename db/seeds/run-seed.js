const testData = require("../data/test-data");
const seedDB = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seedDB(testData).then(() => db.end());
};

runSeed();
