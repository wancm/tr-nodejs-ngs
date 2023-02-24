const EventEmitter = require("events");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new EventEmitter();
const server = require("./server")(client);

server.on("response", (response) => {
  process.stdout.write("\033c");
  process.stdout.write(`Resp: ${response}`);
  process.stdout.write("\n");
});

let command, args;
rl.on("line", (input) => {
  [command, ...args] = input.split(" ");
  // console.log(input);
  client.emit("command", command, args);
});
