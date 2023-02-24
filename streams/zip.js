// node zip.js file-to-gzip.txt

const crypto = require("crypto");
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

console.log(file);

const Transform = require("stream");

const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  },
});

// below code will compress and encrypt the file
fs.createReadStream(file) //
  .pipe(zlib.createGzip()) // zip
  .pipe(crypto.createCipher("aes256", "a_secret")) // encrypt
  .on("data", () => process.stdout.write("."))
  //.pipe(progress)
  //.pipe(fs.createWriteStream(file + ".gz")) // .gz for compressed file
  .pipe(fs.createWriteStream(file + ".zz")) // .zz for encrypted file
  .on("finish", () => console.log("Done"));
