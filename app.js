const express = require("express");
const fs = require("fs");

const app = express();
//register vieew engine
app.set("view engine", "ejs");

//listen for requests,
app.listen(3000);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/my-website", (req, res) => {
  res.render("my-website");
});
app.get("/node-js", (req, res) => {
  res.render("node-js");
});
app.get("/projeckts", (req, res) => {
  res.render("projeckts");
});
app.get("/test", (req, res) => {
  res.render("test");
});
app.get("/try-again", (req, res) => {
  res.render("try-again");
});

/*readStream.on("data", (chunk) => {
  console.log("/...New chunk/n");
  cosnsole.log(chunk);
});*/
//register
app.get("/home", (req, res) => {
  res.redirect("");
});
//err
app.use((req, res) => {
  res.status(404).render("404");
});
