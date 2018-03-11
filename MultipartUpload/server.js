const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const jimp = require('jimp');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null, true);
    } else {
      next({message: "That filetype isn't allowed!"}, false)
    }
  }
}

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/upload', multer(multerOptions).array('images', 100), (req, res) => {
  Promise.all(req.files.map((image) => {
    return Promise.all[
      saveImage(image, req.body.category),
      saveThumbnail(image, req.body.category)
    ]
  }))
  .then(() => res.end("finish"));
});

function saveImage(file, category) {
  const extension = file.mimetype.split('/')[1];
  return jimp.read(file.buffer)
    .then((image) => {
      image.resize(800, jimp.AUTO)
           .write(`./uploads/${category}/${file.originalname}`);
    })
    .catch(console.error);
}

function saveThumbnail(file, category) {
  return jimp.read(file.buffer)
    .then((image) => {
      image.resize(100, jimp.AUTO)
           .write(`./uploads/${category}/thumbnails/_${file.originalname}`)
    })
    .catch(console.error)
}


app.listen(7777, function(a) {
  console.log("Listening to port 7777");
});
