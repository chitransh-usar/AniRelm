const multer = require("multer")
const {v4: uuidv4} = require("uuid");
const path = require("path");

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb){
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;