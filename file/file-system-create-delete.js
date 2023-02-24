// https://nodejs.org/api/fs.html

const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "seed");

// if (!fs.existsSync(dirname)) {
//   // create a directory /seed
//   fs.mkdirSync(dirname);
// }

const ms1Day = 24 * 60 * 60 * 1000;

// // code below generated 10 files
// // with different last accessed & modified time.
// for (let i = 0; i < 10; i++) {
//   const filePath = path.join(dirname, `file_${i}`);
//   fs.writeFile(filePath, i.toString(), (err, data) => {
//     if (err) throw err;

//     const time = (Date.now() - i * ms1Day) / 1000;
//     // change the file modified time
//     // fs.utimes changed the file last accessed & modified time
//     fs.utimes(filePath, time, time, (err) => {
//       if (err) throw err;
//     });
//   });
// }

const files = fs.readdirSync(dirname);

// /** Print files with modified time that are in ./seed folder ******************************/
// files.forEach((file) => {
//   const filePath = path.join(dirname, file);
//   fs.stat(filePath, (err, stats) => {
//     if (err) throw err;

//     console.log(`${filePath}: ${stats.mtime}`);
//   });
// });

/** To delete files that are 7 days older ******************************/
files.forEach((file) => {
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    console.log(stats.mtime.getTime());
    // atime => accessed last time
    // mtime => modified last  time
    if (Date.now() - stats.mtime.getTime() > 7 * ms1Day) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(`deleted ${filePath}`);
      });
    }
  });
});
