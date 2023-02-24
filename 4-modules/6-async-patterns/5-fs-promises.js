const { readFile } = require("fs").promises; // cm: you can get the promise-based readFile func out of the box here

async function main() {
  const data = await readFile(__filename);
  console.log("File data is", data);
}

main();

console.log("TEST");
