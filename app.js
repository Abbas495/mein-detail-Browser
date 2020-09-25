// 2st5raj al mlfat ll2st3ml
// const { text } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { dir } = require("console");
// const { get } = require("http");
const app = express();
const startDirectory = __dirname;
const stats = fs.statSync(startDirectory);

// * Render given files as directory HTML page.

const renderDirectory = (res, parentDir, files, stats) => {
  // t3rif al dlawal ltl3 al 2r9am
  //Show the number of files in the folder
  const options = {
    parentDir: parentDir,

    dirs: files.map((item) => {
      const currentPath = path.join(parentDir, item);
      const isDirectory = fs.statSync(currentPath).isDirectory();

      return {
        name: item,
        entries: isDirectory ? fs.readdirSync(currentPath).length : 0,
      };
    }),
    content: "",

    stats: {
      nummbier: files.length,
      createdAt: moment(stats.birthtime).format("DD.MM.YYYY"),
    },
  };
  res.render("index", options);
};

//* Read content of given file path and render as HTML page.

const renderFile = (res, path, stats) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      return showError(res, path, err.toString());
    }
    //Show file information
    console.log(stats);
    res.render("file", {
      currentDir: path,
      content: data,
      stats: {
        createdAt: moment(stats.birthtime).format("DD.MM.YYYY"),
        sizeAt: stats.size,
      },
    });
  });
};

//* Render given error code as HTML page.

const showError = (res, path, error) => {
  res.status(404).render("404", { currentDir: path, error: error || "" });
};

//register vieew engine

app.set("view engine", "ejs");

//listen for requests,
app.listen(3000);

/*app.get("/", (req, res) => {
  fs.readdir(startDirectory, (err, files) => {
    if (err) {
      showError(res, startDirectory, err.toString());
    } else {
      renderDirectory(res, "", files, stats);
    }
  });
});*/
// alshrt yli 5lana nf3l al code
//Open files inside folders
app.use((req, res) => {
  const newPath = path.join(startDirectory, req.path.replace(/\$SL/g, "/"));
  const parent = path.relative(__dirname, newPath);

  fs.stat(newPath, (err, stats) => {
    if (err) {
      showError(res, newPath, err.toString());
    } else {
      if (stats.isDirectory()) {
        fs.readdir(newPath, (err, files) => {
          if (err) {
            showError(res, newPath, err.toString());
          } else {
            renderDirectory(res, parent, files, stats);
          }
        });
      } else if (stats.isFile()) {
        renderFile(res, newPath, stats);
      } else {
        showError(res, newPath, err.toString());
      }
    }
  });
});
