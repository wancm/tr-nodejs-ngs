const fs = require("fs");
const path = require("path");

const dirname = path.join(__dirname, "watch");
const currentFiles = fs.readdirSync(dirname);

const logWithTime = (
  message //
) => console.log(`${new Date().toUTCString()}: ${message}`);

/** fs.watch would behave differently in different environment,
 * so be sure to test properly in the environment that you are working on.
 */
fs.watch(dirname, (eventType, filename) => {
  // logWithTime('fs.watch triggered');

  /** cm: unfortunately, fs.watch is not very complete
   * the eventType value is equal to 'rename'
   * every time a file is added or deleted.
   *
   * Therefore, some work around like below
   */
  if (eventType == "rename") {
    // check if the filename is existed in the currentFiles array
    const index = currentFiles.indexOf(filename);

    // if it's an existed filename in the array index
    // means the file is being deleted.
    if (index >= 0) {
      // remove the filename from the array
      currentFiles.splice(index, 1);
      logWithTime(`${filename} was removed`);
      return;
    }

    // else, then it's a newly added file
    // let's add the filename to the array
    currentFiles.push(filename);
    logWithTime(`${filename} was added`);
    return;
  }

  // else, then it's a file modifications
  logWithTime(`${filename} was changed`);
});
