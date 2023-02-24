const fs = require("fs");
const server = require("http") //
  .createServer();

const pid = process.pid;

server.on("request", (req, res) => {
  switch (req.url.toLowerCase()) {
    case "/":
    case "/home":
    case "/about":
      let filePath = req.url.toLowerCase();

      if (filePath === "/") {
        filePath = "/home";
      }

      res.writeHead(200, { "Content-type": "text-html" });
      res.end(fs.readFileSync(`.${filePath}.html`));
      break;

    // case "/":
    //   // 301, means permanent moved
    //   res.writeHead(301, { Location: "/home" });
    //   res.end();
    //   break;

    case "/process":
      res.writeHead(200, {
        "Content-type": "text-html",
        "Cache-control": "no-cache",
      });

      // simulate CPU work
      for (let i = 0; i < 1e7; i++);

      const animal = "elephant";
      // It will repeatedly send the word 'elephant' in a  'text/html' format file
      res.end(`Handled by process ${pid} \n\n ${animal.repeat(1000)}`);

    default:
      // 301, means permanent moved
      res.writeHead(404);
      res.end();
  }
});

// to listen to message from isMaster cluster
process.on("message", (msg) => {
  console.log(`Message  from master: ${msg}`);
});

server.listen(8000, () => console.log(`Started process ${pid}`));
