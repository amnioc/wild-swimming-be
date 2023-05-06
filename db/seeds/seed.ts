// export {};

const mongoose = require("mongoose");
const Comments = require("../../models/commentModel.ts");
const seedComments = require("../data/test-data.ts");
require("dotenv").config({
  path: "./.env.development",
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

const seedDB = async () => {
  await Comments.deleteMany({}); //drop pre-existing
  await Comments.insertMany(seedComments);
  console.log("seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = { seedDB };
