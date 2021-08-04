const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPost = require("./postData");
const seedComment = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  process.exit(0);
};

seedAll();
