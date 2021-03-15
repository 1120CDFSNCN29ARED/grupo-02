const express = require("express");
const { url } = require("inspector");
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const productsController = require("../controllers/productsController");
const {vehicleCreationValidator, vehicleCreationValidation, partCreationValidator, partCreationValidation} = require("../middlewares/productCreationMiddleware");
const productOwner = require("../middlewares/productOwnerMiddleware");

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


router.get("/create/:productType?", authMiddleware, productsController.create);
router.post("/create/vehicle", uploadFile.fields([{ name: 'productImages' }]), vehicleCreationValidator, vehicleCreationValidation, productsController.storeVehicle);
router.post("/create/part", uploadFile.fields([{ name: 'productImages' }]), partCreationValidator, partCreationValidation, productsController.storePart);

router.get("/details/:productType/:productID", productsController.details);

router.get("/edit/:productType/:productID", authMiddleware, productOwner, productsController.edit);
router.put("/edit/vehicle/:productID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), vehicleCreationValidator,
vehicleCreationValidation, productsController.updateVehicle);
router.put("/edit/part/:productID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), partCreationValidator,
partCreationValidation, productsController.updatePart);

router.post("/question/:productType/:productID", productsController.question);

router.get("/deleteImage/:productType/:productID", authMiddleware, productOwner, productsController.deleteImage);
router.delete("/delete/:productType/:productID", authMiddleware, productOwner, productsController.delete);

router.get("/search", urlClearner, productsController.search);
router.get("/searchBar/:searchValue?", urlClearner, productsController.searchBar);

router.get("/favourites/add/:productType/:productID", authMiddleware, productsController.addFavourite)
router.get("/favourites/delete/:productType/:productID", authMiddleware, productsController.deleteFavourite)

module.exports = router;