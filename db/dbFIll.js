const { Bodies } = require("../models");
const { readAndAppend } = require("./fsUtils");
const fetch = require("node-fetch");
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

// console.log(namesArr);
let dataArr = [];
let fullArr = parsedJson.bodies.map((body) => {
  // console.log(body);
  let dbArr = {
    name: body.englishName ? body.englishName : body.name,
    isPlanet: body.isPlanet,
    moons: body.moons,
    aroundPlanet: body.aroundPlanet,
    discoveredBy: body.discoveredBy,
    discoveryDate: body.discoveryDate,
    mass: body.mass,
    perihelion: body.perihelion,
    aphelion: body.aphelion,
    gravity: body.gravity,
    sideralOrbit: body.sideralOrbit,
  };
  dataArr.push(dbArr);
});

const reqLoop = async () => {
  for (let i = 280; i < 290; i++) {
  let bodyName = dataArr[i].name;
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${bodyName}`;
    let req = await get_request(url, bodyName, i);
    console.log(req);
};
}
reqLoop();
// get request
async function get_request(url, bodyName, i) {
  const encodedURI = encodeURI(url);
  const res = await fetch(encodedURI);
  safeParseJSON(res, i);
}
// data response from get request wiki
const finalArr = [];
const safeParseJSON = async (response, i) => {
  try {
    const responseData = await response.json();
    let data = responseData;
    let blurb = data.extract;
    let counter = 0;
    const body = dataArr[i];
    body.explanation = blurb;
    counter++;
    // finalArr.push(body);
    readAndAppend(body, "./db.json")
    console.log(finalArr);
    console.log(counter);
    // finalArr.forEach(e => {
    //   readAndAppend(e, "./db.json");
    // });
  } catch (err) {
    console.error("Error:", err);
  }
}

readAndAppend(finalArr, "./db.json");

