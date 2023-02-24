const server = require("net").createServer();
let counter = 0; // for Id generation
let socket = {}; // socket dictionary

server.on("connection", (socket) => {
  socket.id = counter++;
  socket[socket.id] = socket;

  console.log("Client Connected");
  socket.write("Welcome new client!\n");

  socket.on("data", (data) => {
    Object.entries(sockets).forEach(([, cs]) => {
      cs.write(`${socket.id}: `);
      cs.write(data);
    });
  });

  socket.on("end", () => {
    delete socket[socket.id];
    console.log("Client Disconnected");
  });
});

server.listen(8000, () => console.log("Server bound"));
