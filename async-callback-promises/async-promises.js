const fs = require("fs");
const { functionsIn } = require("lodash");

// this function works both way
// 1. promise
// 2. a normal callback
const readFileAsArray = function (file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function (err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }

      const lines = data.toString().trim().split("\n");
      resolve(lines);
      cb(null, lines);
    });
  });
};

// now we could call the same function either with promise or callback

// with promise
readFileAsArray("./number") //
  .then((lines) => {
    console.log("promises");
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter((n) => n % 2 === 1);
    console.log("promises: odd number count", oddNumber.length);
  })
  .catch(console.error);

// with callback
readFileAsArray("./number", (err, lines) => {
  console.log("callback");
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumber = numbers.filter((n) => n % 2 === 1);
  console.log("callback: odd number count", oddNumber.length);
});

async function countOdd() {
  console.log("async");
  // try catch call is very important in an async function
  try {
    const lines = await readFileAsArray("./number");
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter((n) => n % 2 === 1);
    console.log("async: odd number count", oddNumber.length);
  } catch (error) {
    console.error(error);
  }
}

countOdd();
