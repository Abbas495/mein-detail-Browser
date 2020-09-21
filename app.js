const express = require("express");
const fs = require("fs");

const app = express();
//register vieew engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  res.render("index");
});
