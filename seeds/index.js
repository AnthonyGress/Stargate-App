const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedBodies = require("./seedBodies");
// const seedComment = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBodies();

  process.exit(0);
};

seedAll();
