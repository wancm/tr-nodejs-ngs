const compression = require("compression");
const fs = require("fs");
const express = require("express");
const app = express();

// Compress all HTTP responses
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.get("/img*", (req, res) => {
  let filePath = req.url.toLowerCase();
  console.log(filePath);
  res.setHeader("Conte nt-type", "image/jpeg");
  res.send(fs.readFileSync(`.${filePath}`));
});

app.get("/", (req, res) => {
  // const animal = "elephant";
  // It will repeatedly send the word 'elephant' in a
  // 'text/html' format file
  // res.send(animal.repeat(1000));

  res.setHeader("Content-type", "text-html");
  res.setHeader("Cache-Control", "no-cache");
  res.send(fs.readFileSync(`./home.html`));
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
