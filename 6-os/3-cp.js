/**
 * allow you to execute any operating system command from within a Node process using a sub process,
 * and get the result of running that command into your main process.
 *
 * The sky is the limit here! Anything you can do in your operating system shell can be done from within Node.
 *
 * child_process.fork
 *  - Fork is a special one to create some processes that run Node itself again,
 *      this is the concepts that power the cluster concept in Node.
 *
 * child_process.exec()
 * child_process.execFile()
 * child_process.spawn()
 *
 */

const { spawn } = require("child_process");

// Print Working Directory
const pwd = spawn("pwd");
pwd.stdout.pipe(process.stdout);

// Read content of a file
const { HOME } = process.env;
const cat = spawn("cat", [`${HOME}/.bash_profile`]);
cat.stdout.pipe(process.stdout);

// List files
const ls = spawn("ls", ["-l", "."]);
ls.stdout.pipe(process.stdout);

// Use Shell Syntax
const shell = spawn("ls -al ~ | wc -l", { shell: true });
shell.stdout.pipe(process.stdout);
