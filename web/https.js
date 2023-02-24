/**
 * CM: use openssl to generate the *.key and *.crs files
 * and then self-signed the *.crt file
 */

const fs = require("fs");
const server = require("https").createServer({
  key: fs.readFileSync("C:\\Users\\wanch\\testing.key"),
  cert: fs.readFileSync("C:\\Users\\wanch\\testing.crt"),
});

server.on("request", (req, res) => {
  res.writeHead(200, { "content-type": "text-plain" });
  res.end("Hello");
});

// default timeout is 2 minutes
// server.timeout = 1000; // set the server timeout period

server.listen(443);
