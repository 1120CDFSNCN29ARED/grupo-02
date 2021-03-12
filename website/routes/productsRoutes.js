const express = require("express");
const { url } = require("inspector");
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const productsController = require("../controllers/productsController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, path.join(__dirname, '../public/img/products'));
      
    },
    filename: function (req, file, cb) { 
      const newFileName = `product-image-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, newFileName);
    },
  });
  
const uploadFile = multer({ storage });

const urlClearner = require('../middlewares/urlCleaner');


router.get("/create/:productType?", authMiddleware,productsController.create);
router.post("/create/:productType", uploadFile.fields([{ name: 'productImages' }]), productsController.store);

router.get("/details/:productType/:productID", productsController.details);

router.get("/edit/:productType/:productID", productsController.edit);
router.put("/edit/:productType/:productID",uploadFile.fields([{ name: 'productImages' }]), productsController.update);

router.post("/question/:productType/:productID", productsController.question);

router.get("/deleteImage/:productType/:productID", productsController.deleteImage);
router.delete("/delete/:productType/:productID", productsController.delete);

router.get("/search", urlClearner, productsController.search);
router.get("/searchBar/:searchValue?", urlClearner, productsController.searchBar);

module.exports = router;