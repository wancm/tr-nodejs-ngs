/**
 * Errors vs Exceptions
 *
 * Error is "Problem" that the application doesn't know about.
 * - the application are usually are NOT prepare to deal with it.
 *
 * Exception is a "Condition" that the application know about
 *  - the application are usually are prepare to deal with it.
 *  - the application catch the exception and do something with it
 */

// const path = require("path");
const fs = require("fs");

// const files = [".bash_profile", ".npmrc"];
const files = ["1-loop.js", "xxx.js", "2-try.js"];

files.forEach((file) => {
  try {
    // const filePath = path.resolve(process.env.HOME, file);
    // fs.readFileSync(filePath), will do the reading synchronously

    // const data = fs.readFileSync(file, "utf-8"); // output with plain text
    // const data = fs.readFileSync(file, "utf-40"); // passing in invalid encoding format
    const data = fs.readFileSync(file);
    console.log("File data is", data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("file not found");
    } else {
      console.log(error);
    }
  }
});
