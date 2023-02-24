// node unzip.js file-to-gzip.txt.zz

const crypto = require("crypto");
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

console.log(file);

const Transform = require("stream");

// below code will compress and encrypt the file
fs.createReadStream(file) //
  .pipe(crypto.createDecipher("aes256", "a_secret")) // decrypt
  .pipe(zlib.createGzip()) // unzip
  .on("data", () => process.stdout.write("."))
  .pipe(fs.createWriteStream(file.slice(0, -3))) // take away the .zz extension
  .on("finish", () => console.log("Done"));
