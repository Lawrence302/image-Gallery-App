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

// creating a schema for the images
const imageSchema = new mongoose.Schema({
  imageUrl: String,
});

// generating a model for the images
const image = new mongoose.model('images', imageSchema);

// getting the home page whichis the upoads page
app.get('/', (req, res) => {
  res.render('index');
});

// uploading an image
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'upload failed file not found',
    });
  }
  // console.log(req.file);

  // adding the filename to mongodb
  const imageUrl = await new image({
    imageUrl: req.file.filename,
  });

  // saving the file name to mongodb
  const savedImage = await imageUrl.save();
  res.status(200).json({
    status: 200,
    message: 'uploaded successfully',
    data: savedImage.imageUrl,
  });
});

// getting the images to display
app.get('/images', async (req, res) => {
  // geting all the images from db
  const images = await image.find();
  if (!images || images.length === 0) {
    return res.render('gallery', {
      images: [],
      message: ' image list is empty',
    });
  }

  // console.log(images);
  // rendering the gallery page with the images
  res.render('gallery', { images: images });
});

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}...`);
});
