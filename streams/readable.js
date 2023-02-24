const { Readable } = require("stream");

const inStream = new Readable();

// pushing in all the data to the stream..
// which this is not the efficient way
inStream.push("ABC \n");
inStream.push(null); // pushing null is signal the receiver that the stream has not anymore data

inStream.pipe(process.stdout);

const inStream2 = new Readable({
  read(size) {
    setTimeout(() => {
      // 90 = z
      if (this.currentCharCode > 90) {
        // signal that the stream has no more data
        this.push(null);
        return;
      }

      // on every read, will push the letter and increment the character code
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 500);
  },
});

inStream2.currentCharCode = 65; // 65=a
inStream2.pipe(process.stdout);

process.on("exit", () => {
  console.error(`\n\ncurrentCharCode is ${inStream2.currentCharCode}`);
});

// catch the error and then just exit the process
process.stdout.on("error", process.exit);
