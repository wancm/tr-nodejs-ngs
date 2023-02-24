/**
 * https://app.pluralsight.com/course-player?clipId=e279bbc0-d64f-41e4-8081-f3960ea68daa
 *
 * One of the problems in running a single instance of a Node application vs many
 * is that when that instance crashes, it has to be restarted.
 * And there will be downtime between these two actions, even if the process was automated as it should be.
 *
 * This also applies to the case when the server has to deploy new code,
 * with one instance, there will be a downtime and this affects the availability of the system.
 *
 * When we have multiple instances, the availability of the system can be easily increased,
 * with just a few extra lines of code... as below
 */

const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // we can monitor the 'exit' of a worker process
  cluster.on("exit", (worker, code, signal) => {
    // from here, we could just fork a new worker process

    /**
     * condition below make sure the worker process is actually crashed,
     * and was not manually disconnected or killed by the master process,
     * which we're not doing here, but might eventually need to.
     *
     * For example: The master process might decide that we are using too much of resources,
     * based on the load patterns it sees and it will need to kill a few workers in that case.     *
     * To do so, we can use the .kill or .disconnect method on any worker and the
     * .exitedAfterDisconnect flag will be to set to true in that case,
     * condition below ensure that it will fork a new worker for that case.
     */
    if (code != 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker ...`);

      // for a new worker ...
      cluster.fork();
    }
  });
} else {
  require("./server-random-down");
}
