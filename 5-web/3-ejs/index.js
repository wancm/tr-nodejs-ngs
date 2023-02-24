/**
 * Other Web template system
 * Pug // previously name as Jade
 * Handlebards // trainer favorite, he think is more simple and feature-rich. The same language the Ember framework is uses.
 * EJS // easiest
 *
 */

const express = require("express");

const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index");
});

server.get("/about", (req, res) => {
  res.render("about");
});

server.listen(4242, () => {
  console.log("Express Server is running...");
});
