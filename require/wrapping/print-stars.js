const print = (stars, header) => {
  console.log("*".repeat(stars));
  console.log(header);
  console.log("*".repeat(stars));
};

if (require.main == module) {
  // Running as script. (ex: from a power-shell terminal)
  // node print-stars.js 5 "hello from powershell"
  print(process.argv[2], process.argv[3]);
} else {
  // Being required
  module.exports = print;
}
