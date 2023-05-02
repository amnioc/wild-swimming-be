const { faker } = require("@faker-js/faker");

function createRandomUser() {
  const created_at = faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z"
  );
  const username = faker.internet.userName();
  const body = faker.lorem.sentence(5);
}

const seedComments = [
  {
    username: "swimmer123",
    body: "love a swim I do",
    created_at: new Date(),
  },
  {
    username: "water_baby",
    body: "beautiful surroundings",
    created_at: new Date(),
  },
  {
    username: "nature_lover",
    body: "best swim yet! strong recommend",
    created_at: new Date(),
  },
  {
    username: "nature_lover",
    body: "wow, love it",
    created_at: new Date(),
  },
  {
    username: "swimmerIam",
    body: "great day out",
    created_at: new Date(),
  },
  {
    username: "swimmer123",
    body: "unreal! loved my time there",
    created_at: new Date(),
  },
  {
    username: "riversAreFun",
    body: "went with friends, was great",
    created_at: new Date(),
  },
  {
    username: "nature_lover",
    body: "the fly tipping made me sad",
    created_at: new Date(),
  },
  {
    username: "loverNature",
    body: "the sights! the trees!",
    created_at: new Date(),
  },
  {
    username: "swimmerIam",
    body: "strong recommend",
    created_at: new Date(),
  },
];

module.exports = seedComments;
