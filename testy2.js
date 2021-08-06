const request = require("request");
const options = {
  method: "GET",
  url: `// https://en.wikipedia.org/api/rest_v1/page/summary/${Body.name}`,
};
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});