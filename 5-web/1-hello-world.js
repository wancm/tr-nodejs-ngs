const http = require("http");

// log to inspect the global object it as tree because it's a big object
// console.dir(global, { depth: 0 });

const requestListener = (req, res) => {
  //
  // req, res are streams !!

  // https://nodejs.dev/en/api/v19/http/#class-httpincomingmessage
  console.dir(req, { depth: 0 }); // only print the first level properties

  /**
   * res.end('hello'); <= this is also equivalent to code below
   * res.write('hello');
   * res.end();
   */
  res.write("Hello World\n");
  res.end(); // we need to follow the HTTP protocol, that protocol requires an explicit signal that the communication is over, which is what we need to res.end();
};

const server = http.createServer();
server.on("request", requestListener);

server.listen(4242, () => {
  console.log("Server is running...");
});
