/**
 * The Event Loop
 * What node uses to process asynchronous actions and interface them for you
 * so that you don't to have to deal with threads.
 *
 * Every node starts this infinite loop that we call Event Loop.
 * But if the process has no asynchronous process to perform, the Event Loop will exit,
 * and the operating system will terminate that node processes.
 */

setInterval(() => {
  console.log("Hello Event Loop!!");
}, 5000);
