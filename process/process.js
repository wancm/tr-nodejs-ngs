// process is an event emitter

process.on("exit", (code) => {
  // do one final synchronous operation
  // before the node terminates

  console.log(`About to exit the process with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  // something went unhandled.
  // Do any cleanup and exit anyway!

  // print the error
  console.error(err); // but don't  do just this....you need to exit the process

  // FORCE to exit the process too...
  // note: if you don't exit the process while an unhandled exception being thrown, it just might do MORE damage
  process.exit(1);
});

// keep the event loop busy
// to prevent the process exit
process.stdin.resume();

// purposely call a none existed func in order to throw an error
// trigger a TypeError exception
console.dog(); // TypeError: console.dog is not a function
