const request = require("request");

const options = {
  method: "GET",
  url: "https://api.le-systeme-solaire.net/rest/bodies/",
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
