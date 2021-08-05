const { readAndAppend } = require("./fsUtils");

let obj = {
  test: 1,
};

let array = [1, 2, 3, 4];

readAndAppend(array, "./db.json");
