const { Bodies } = require("../models");

const fs = require("fs");
const json = fs.readFileSync("../seeds/Open-Solar-API.json");

let parsedJson = JSON.parse(json);
// console.log(typeof parsedJson);
let namesArr = [];
let newArr = parsedJson.bodies.map((body) => {
  // console.log(body);
  let dbArr = {
    name: body.englishName ? body.englishName : body.name,
  };
  namesArr.push(dbArr);
});

console.log(namesArr);
