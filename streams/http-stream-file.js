const fs = require("fs");
const server = require("http").createServer();

/** Definitions of Streams
 * Collections of data that might not be available all at once
 * and don't have to fit in memory.
 */

// // create a big file
// const file = fs.createWriteStream("./big.file");
// // write 1 millions time
// for (i = 1; i < 1e6; i++) {
//   file.write(
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem corrupti dolorem eaque sed, adipisci obcaecati sint ea unde voluptas atque quo eligendi maxime ratione vitae sequi quis voluptatibus optio nemo."
//   );
// }

server.on("request", (req, res) => {
  /** if you use code below to res the file data,
   * if will eat up the server 200 MB memory just to do that!
   * this is because, Node.js will buffer the whole file to return to the client
   
  fs.readFile("./big.file", (err, data) => {
    if (err) throw err;

    res.end(data);
  });
  */
  //
  // instead, we would use stream,
  // which will stream the data to the client chunk by chunk,
  // it doesn't buffer the memory at all!
  // It will eat up around 10 mb of the server memory!
  const src = fs.createReadStream("./big.file");
  src.pipe(res);
});

server.listen(8000);
