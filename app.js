const { text } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { get } = require("http");

const app = express();

const startDirectory = __dirname;
const startDirectory2 = __filename;
//register vieew engine
app.set("view engine", "ejs");

//listen for requests,
app.listen(3000);

app.get("/", (req, res) => {
  fs.readdir(startDirectory, (err, files) => {
    res.render("index", { dirs: files });
  });
});
app.use(express.static(startDirectory));
/*app.get("viwes", function (req, res) {
  res.status(200).send("User Page");
});*/
app.use((req, res) => {
  const newPath = path.join(startDirectory, req.path);

  fs.readdir(newPath, (err, files) => {
    if (err) {
      res.status(404).render("404");
    } else {
      /*  files.forEach(function (file) {
        fs.stat(startDirectory + `startDirectory`, function (err, stats) {
          console.log(stats);*/

      res.render("index", { dirs: files });
      //        });
      //   });
    }
  });
});
// app.get('/my-website', (req, res) => {
//   res.render('my-website')
// })
// app.get('/node-js', (req, res) => {
//   res.render('node-js')
// })
// app.get('/projeckts', (req, res) => {
//   res.render('projeckts')
// })
// app.get('/test', (req, res) => {
//   res.render('test')
// })
// app.get('/try-again', (req, res) => {
//   res.render('try-again')
// })

/*readStream.on("data", (chunk) => {
  console.log("/...New chunk/n");
  cosnsole.log(chunk);
});*/
//register
// app.get('/home', (req, res) => {
//   res.redirect('')
// })
//err

// let myFileloader = function (ha) {
//   return 'myfileloader: ' + fs.readFileSync(text)
// }
// app.get('/ha', (req, res) => {
//   res.render('ha')
// })
