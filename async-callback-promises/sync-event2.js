const fs = require("fs");
const EventEmitter = require("events");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time("execute");
    this.emit("begin");

    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }

      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

withTime.on("data", (data) => {
  console.log(`Length: ${data.length}`);
});

// if we have multiple listener that are listening to the same event,
// it will be run in order,
// the first listener that register, is the first listener wil be invoke
// use xx.prependLister() <= use "prependLister" func instead of "on", if you wants the listener to be invoke first
withTime.on("data", (data) => {
  console.log("Data", data);
});

// withTime.removeListener ... <= if you wants to remove the listener

// if we don't handle the error like below,
// then if error happens, Node will actually exist the process,
// but if have handled the error like below, the process will continue the next executions.
// Note: if you have handled it like below, then the process.on("uncaughtException") will not be triggered
withTime.on("error", (err) => {
  console.error(err);
});

// process.once <= this means invoke the event handler just once, not every time it happens,
// this helps when multiple error triggered together and causes process.on trigger multiple time, that it cause problem to any cleanup code that are trying to execute
// this is a practical concept while do the "uncaughtException" because when the first exception are being thrown, the process should do cleanup and exit immediately
process.once("uncaughtException", (err) => {
  console.log("uncaughtException:", err);

  // do some cleanup
  process.exit(1); // exit anyway
});

// // passing empty file name to purposely caused an error
// withTime.execute(fs.readFile, "");

withTime.execute(fs.readFile, __filename);
