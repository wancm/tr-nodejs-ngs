/**
 * Other Web framework
 * - express
 * - koa // focuses on modern features of the javascript languages and Node runtime
 * - sailsjs //inspired by Rails. A more featured framework that provide working with modules and auto generate APIs, and many other cool features
 * - meteor // offers a more integrated way to build web application in general
 */

const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello world from express");
});

server.get("/about", (req, res) => {
  res.send("This is about page");
});

server.listen(4242, () => {
  console.log("Express Server is running...");
});
