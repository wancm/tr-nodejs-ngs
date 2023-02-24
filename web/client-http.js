const https = require("https");

const req = https.request(
  { hostname: "www.google.com" }, //
  (res) => {
    console.log(res.statusCode);
    console.log(res.headers);

    res.on("data", (data) => {
      console.log(data.toString());
    });
  }
);

req.on("error", (e) => console.log(e));

req.end();
