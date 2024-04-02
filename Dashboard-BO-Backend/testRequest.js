const http = require("http");

// Options to be used by request
const options = {
  host: "localhost",
  port: "3000",
  path: "/energy-data",
};

// Callback function is used to deal with response
const callback = function (response) {
  let body = "";
  response.on("data", function (data) {
    body += data;
  });

  response.on("end", function () {
    // Data received completely.
    console.log(JSON.parse(body));
  });
};

// Make a request to the server
const req = http.request(options, callback);
req.end();
