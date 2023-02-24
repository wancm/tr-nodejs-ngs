const fs = require("fs");
const util = require("util");

/**
 * cm: promisify any asynchronous function
 * with that, we could use async await keyword like below.
 * Node's idiomatic callback pattern
 */
const readFile = util.promisify(fs.readFile);

async function main() {
  const data = await readFile(__filename);
  console.log("File data is", data);
}

main();

console.log("TEST");
