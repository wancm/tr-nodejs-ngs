const fs = require("fs");

fs.readFile(__filename, function cb1(err, data) {
  fs.writeFile(__filename + ".copy", data, function cb2(err) {
    // Nest more callbacks here...
    /** cm:
     * this is known as the pyramid of doom in computer programming, and it's not ideal.
     * It's make code hard to maintain
     */
  });
});

console.log("TEST");
