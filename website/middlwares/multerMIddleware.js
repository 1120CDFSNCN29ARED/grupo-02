//I need to work out how to plug this middleware into the user ROutes!!!

const multer = require('multer');
//************** MULTER ************************
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, path.join(__dirname, '../public/img/users'));
    
  },
  filename: function (req, file, cb) { 
    const newFileName = `user-image-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

function uploadFile() {
  const uploadFile = multer({ storage });
  next();
};

module.exports = uploadFile;