const { Bodies } = require("../models");

const fs = require("fs");
const json = fs.readFileSync("db/db.json");
const seeds = JSON.parse(json);
console.log(seeds);

const seedBodies = () => Bodies.bulkCreate(seeds);

module.exports = seedBodies;
