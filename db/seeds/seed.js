// export {};

const mongoose = require("mongoose");
const Comment = require("../../models/commentModel.ts");
// const { seedComments } = require("../data/test-data");
require("dotenv").config({
  path: "./.env.development",
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

const seedComments = [
  {
    username: "swimmer123",
    body: "love a swim I do",
  },
  {
    username: "water_baby",
    body: "beautiful surroundings",
  },
  {
    username: "nature_lover",
    body: "best swim yet! strong recommend",
  },
  {
    username: "nature_lover",
    body: "wow, love it",
  },
  {
    username: "swimmerIam",
    body: "great day out",
  },
  {
    username: "swimmer123",
    body: "unreal! loved my time there",
  },
  {
    username: "riversAreFun",
    body: "went with friends, was great",
  },
  {
    username: "nature_lover",
    body: "the fly tipping made me sad",
  },
  {
    username: "loverNature",
    body: "the sights! the trees!",
  },
  {
    username: "swimmerIam",
    body: "strong recommend",
  },
];

const seedDB = async () => {
  await Comment.deleteMany({}); //drop pre-existing
  await Comment.insertMany(seedComments);
  console.log("seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = seedDB;
