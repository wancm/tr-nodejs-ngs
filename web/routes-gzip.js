/** https://nodejs.org/api/zlib.html */

const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");
const server = require("http") //
  .createServer((req, res) => {
    res.setHeader("vary", "Accept-Encoding");
  });

server.on("request", (req, res) => {
  //
  const onError = (err) => {
    if (err) {
      // If an error occurs, there's not much we can do because
      // the server has already sent the 200 response code and
      // some amount of data has already been sent to the client.
      // The best we can do is terminate the response immediately
      // and log the error.
      res.end();
      console.error("An error occurred:", err);
    }
  };

  let filePath = req.url.toLowerCase();

  if (filePath === "/") {
    filePath = "/home";
  }

  if (filePath.indexOf("/img") > -1) {
    res.writeHead(200, { "Content-type": "image/jpeg" });
    // pipeline(
    //   fs.createReadStream(`.${filePath}`),
    //   zlib.createGzip(),
    //   res,
    //   onError
    // );

    res.write(fs.readFileSync(`.${filePath}`));
    res.end();

    return;
  }

  switch (filePath) {
    case "/":
    case "/home":
    case "/about":
      let acceptEncoding = req.headers["accept-encoding"];
      if (!acceptEncoding) {
        acceptEncoding = "";
      }

      // Note: This is not a conformant accept-encoding parser.
      // See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
      if (/\bdeflate\b/.test(acceptEncoding)) {
        res.writeHead(200, {
          "Content-type": "text-html",
          "Content-Encoding": "deflate",
        });
        pipeline(
          fs.createReadStream(`.${filePath}.html`),
          zlib.createDeflate(),
          res,
          onError
        );
      } else if (/\bgzip\b/.test(acceptEncoding)) {
        res.writeHead(200, {
          "Content-type": "text-html",
          "Content-Encoding": "gzip",
        });
        pipeline(
          fs.createReadStream(`.${filePath}.html`),
          zlib.createGzip(),
          res,
          onError
        );
      } else if (/\bbr\b/.test(acceptEncoding)) {
        res.writeHead(200, {
          "Content-type": "text-html",
          "Content-Encoding": "br",
        });
        pipeline(
          fs.createReadStream(`.${filePath}.html`),
          zlib.createBrotliCompress(),
          res,
          onError
        );
      } else {
        res.writeHead(200, { "Content-type": "text-html" });
        pipeline(fs.readFile(`.${filePath}.html`), res, onError);
      }

      break;

    // case "/":
    //   // 301, means permanent moved
    //   res.writeHead(301, { Location: "/home" });
    //   res.end();
    //   break;

    default:
      // 301, means permanent moved
      res.writeHead(404);
      res.end("404");
  }
});

server.listen(8000);
