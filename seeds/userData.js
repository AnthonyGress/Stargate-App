const { User } = require("../models");

const userData = [
  {
    username: "McLovin",
    email: "mclovin@email.com",
    password: "password",
  },
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
    password: "password",
  },
  {
    username: "PrincessLeia",
    email: "leia@email.com",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
