const { User } = require("../models");

const userData = [
  {
    username: "Anakin Skywalker",
    email: "anni@email.com",
    password: "password",
  },
  {
    username: "Luke Skywalker",
    email: "luke@email.com",
    password: "password",
  },
  {
    username: "Darth Vader",
    email: "vader@email.com",
    password: "anikant",
  },
  {
    username: "PrincessLeia",
    email: "leia@email.com",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
