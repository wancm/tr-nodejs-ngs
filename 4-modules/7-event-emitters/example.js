const EventEmitter = require("events");

// Streams are Event Emitters
// process.stdin, process.stdout

const myEmitter = new EventEmitter();

// cm: any inside the setImmediate, will be executed on the next tick of the Event Loop.
// therefore, it will invoke any func that subscribe to the 'TEST_EVENT',
// even though the line of code to subscribe is being written after the actual EventEmitter.emit()
setImmediate(() => {
  myEmitter.emit("TEST_EVENT");
});

myEmitter.on("TEST_EVENT", () => {
  console.log("TEST_EVENT was fired 1");
});

myEmitter.on("TEST_EVENT", () => {
  console.log("TEST_EVENT was fired 2");
});

myEmitter.on("TEST_EVENT", () => {
  console.log("TEST_EVENT was fired 3");
});
