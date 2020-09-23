const { text } = require('express')
const express = require('express')
const fs = require('fs')
const path = require('path')
const { get } = require('http')

const app = express()

const startDirectory = __dirname

/**
 * Render given files as directory HTML page.
 */
const renderDirectory = (res, path, files) => {
  res.render('index', {
    parentDir: path,
    dirs: files,
    content: '',
  })
}

/**
 * Read content of given file path and render as HTML page.
 */
const renderFile = (res, path, content) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return showError(res, path, err.toString())
    }
    res.render('file', {
      currentDir: path,
      content: data,
    })
  })
}

/**
 * Render given error code as HTML page.
 */
const showError = (res, path, error) => {
  res.status(404).render('404', { currentDir: path, error: error || '' })
}

// const startDirectory2 = __filename
//register vieew engine
app.set('view engine', 'ejs')

//listen for requests,
app.listen(3000)

app.get('/', (req, res) => {
  fs.readdir(startDirectory, (err, files) => {
    if (err) {
      showError(res, startDirectory, err.toString())
    } else {
      renderDirectory(res, '', files)
    }
  })
})

// app.use(express.static(startDirectory));
/*app.get("viwes", function (req, res) {
  res.status(200).send("User Page");
});*/

app.use((req, res) => {
  const newPath = path.join(startDirectory, req.path.replace(/\$SL/g, '/'))
  const parent = path.relative(__dirname, newPath)

  fs.stat(newPath, (err, stats) => {
    if (err) {
      showError(res, newPath, err.toString())
    } else {
      // TODO: use stats
      // console.log(stats)

      if (stats.isDirectory()) {
        fs.readdir(newPath, (err, files) => {
          if (err) {
            showError(res, newPath, err.toString())
          } else {
            renderDirectory(res, parent, files)
          }
        })
      } else if (stats.isFile()) {
        renderFile(res, newPath)
      } else {
        showError(res, newPath, err.toString())
      }
    }
  })
})
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
