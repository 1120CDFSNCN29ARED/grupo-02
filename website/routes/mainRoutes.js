const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();

/* Routes */
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes")
const usersRoutes = require('./usersRoutes');

/* Controllers */
const mainController = require("../controllers/mainController");
const usersController = require("../controllers/usersController");


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

router.get("/", mainController.index);

router.get("/login", mainController.login);
router.get("/search", mainController.search);

/* Admin */
router.use("/admin", adminRoutes);

/* Users */
router.use("/users", usersRoutes)
router.get("/register", usersController.create);
router.post("/register", uploadFile.single('image'), usersController.store);

/* Products */
router.use("/products", productsRoutes);

/* Cart */
router.use("/cart", cartRoutes)

module.exports = router;