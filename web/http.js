const server = require("http").createServer();

server.on("request", (req, res) => {
  res.writeHead(200, { "content-type": "text-plain" });
  res.end("Hello");
});

// default timeout is 2 minutes
// server.timeout = 1000; // set the server timeout period

server.listen(8000);
