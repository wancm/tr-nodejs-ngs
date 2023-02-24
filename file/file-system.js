const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "../async-callback-promises");

const files = fs.readdirSync(dirname);

files.forEach((file) => {
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    console.log(`${file}: ${stats.birthtime}`);
  });
});
