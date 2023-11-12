const multer = require('multer');
const path = require('path');

// create storage engine for muler to store upload on disk
const storage = multer.diskStorage({
  //specify the destination directory for storing uploaded files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/images'));
  },

  //filename function specifies how the files should be named
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// initializes the multer middleware by passing an options object to it
const upload = multer({ storage: storage });

// exporting the configuration
module.exports = upload;
