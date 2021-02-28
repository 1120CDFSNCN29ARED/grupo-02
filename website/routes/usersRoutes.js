const express = require("express");
const multer = require('multer');
const path = require('path');

const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

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

const uploadFile = multer({ storage });

router.get("/login", usersController.login);

router.get("/register", usersController.create);
router.post("/register", uploadFile.single("image"), usersController.store);

router.get('/', usersController.index);
router.get('/details/:userId', usersController.detail);

router.get('edit/:userId', usersController.edit);
router.put('edit/:userId',uploadFile.single("image"), usersController.update);

router.delete("/:userId", usersController.destroy);

module.exports = router;