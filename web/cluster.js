/** This is a load-balancing in round-robin */

const cluster = require("cluster");
const os = require("os");

// .isMaster will be true if this is the master cluster
// ex: node cluster.js
if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);

  for (let i = 0; i < cpus; i++) {
    // when you fork,
    // the new cluster.isMaster flag is false,
    // and .isWorker flag is true
    cluster.fork();
  }

  console.dir(cluster.workers, { depth: 0 });

  Object.values(cluster.workers).forEach((worker) => {
    worker.send(`Hello Worker ${worker.id}`);
  });

  //
} else {
  // therefore, the isWorker cluster will execute line below
  require("./routes");
}
