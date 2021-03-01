const express = require("express");
const multer = require('multer');
const path = require('path');

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


router.get("/create/:productType?", productsController.create);
router.post("/create/:productType", uploadFile.fields([{ name: 'vehicleImage1', maxCount: 1 },{ name: 'vehicleImage2', maxCount: 1 },{ name: 'vehicleImage3', maxCount: 1 }]), productsController.store);

router.get("/details/:productType/:productID", productsController.details);

router.get("/edit/:productType/:productID", productsController.edit);
router.put("/edit/:productType/:productID",uploadFile.single("image"), productsController.update);

router.post("/question/:productType/:productID", productsController.question);

router.delete("/delete/:productType/:productID", productsController.delete);

module.exports = router;