/** https://app.pluralsight.com/course-player?clipId=e279bbc0-d64f-41e4-8081-f3960ea68daa
 *  zero down time
 * In the case when we want to restart all worker process when
 * for example, we want to deploy a new code.
 *
 * Well we have multiple instances running, so instead of restarting them together,
 * we can simply restart them one at a time to allow other workers to continue to server request while one worker is being restarted.
 *
 * Or you could let Node.js PM2 to do that for you
 * https://pm2.keymetrics.io/.
 *
 *
 */

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
  console.log(`Master PID: ${process.pid}`);

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

    // 'SIGUSR2', only applicable for Linux, trainer recommend Bash on Window1
    // Window command prompt: taskkill /pid 10172 /F
    process.on("SIGKILL", () => {
      // assigned all workers into an array
      const workers = Object.values(cluster.workers);

      const restartWorker = (workerIndex) => {
        // get this worker
        const worker = workers[workerIndex];

        // if we no longer have nay worker to restart, then return;
        if (!worker) return;

        // to fork another new worker when this worker is existed
        worker.on("exit", () => {
          // but we have to make sure that this exit was actually triggered after a disconnect call,
          // for that, we can use the exitedAfterDisconnect flag
          // If the flag is not true, then the exit was caused by something else,
          // other than our disconnect call
          if (!worker.exitedAfterDisconnect) return; // do nothing

          // fork a new worker to replace the one that we just disconnected
          cluster
            .fork() //
            .on("listening", () => {
              // listening event tell us that this new worker is connected and ready
              // When we get this event, we can safely restart the next worker in sequence.
              restartWorker(workerIndex + 1);
            });
        });

        // disconnect this worker
        worker.disconnect();
      };

      // begin the restart
      restartWorker(0);
    });
  });
} else {
  require("./server");
}
