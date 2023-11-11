const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const upload = require('./middleware/multer.js');
const cors = require('cors');
const ejs = require('ejs');

// importing db module
const main = require('./db');

// connect to the database
main().catch((err) => console.log(err));
const app = express();
const port = 5000;

// using middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const imageSchema = new mongoose.Schema({
  imageUrl: String,
});

const image = new mongoose.model('images', imageSchema);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'upload failed file not found',
    });
  }
  console.log(req.file);
  // adding the filename to mongodb
  const imageUrl = await new image({
    imageUrl: req.file.filename,
  });

  const savedImage = await imageUrl.save();
  res
    .status(200)
    .json({
      status: 200,
      message: 'uploaded successfully',
      data: savedImage.imageUrl,
    });
});

app.get('/images', async (req, res) => {
  // geting all the images from db
  const images = await image.find();
  if (!images || images.length === 0) {
    return res.render('gallery', {
      images: [],
      message: ' image list is empty',
    });
  }

  console.log(images);
  res.render('gallery', { images: images });
});

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}...`);
});
