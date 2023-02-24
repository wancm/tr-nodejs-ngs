// example of a Duplex type of stream is 'Socket'
const { Duplex } = require("stream");

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    if (this.currentCharCode > 90) {
      this.push(null);
      return;
    }

    this.push(String.fromCharCode(this.currentCharCode++));
  },
});

inoutStream.currentCharCode = 65;

// code below equivalent to
// a.pipe(b) <= this means we are passing in the writeable stream of 'a' and input into the readable stream 'b'
// 1. process.stdin.pipe(inoutStream);
// 2. inoutStream.pipe(process.stdout);
process.stdin.pipe(inoutStream).pipe(process.stdout);
