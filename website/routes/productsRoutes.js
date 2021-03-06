const express = require("express");
const { url } = require("inspector");
const multer = require('multer');
const path = require('path');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const productsController = require("../controllers/productsController");
//const {vehicleCreationValidator, vehicleCreationValidation, partCreationValidator, partCreationValidation} = require("../middlewares/productCreationMiddleware");
const productOwner = require("../middlewares/productOwnerMiddleware");
const urlClearner = require("../middlewares/urlCleaner");

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
/*
router.get("/create/:productType?", authMiddleware, productsController.create);
router.post("/create/vehicle", authMiddleware, uploadFile.fields([{ name: 'productImages' }]), vehicleCreationValidator, vehicleCreationValidation, productsController.storeVehicle);
router.post("/create/part", authMiddleware, uploadFile.fields([{ name: 'productImages' }]), partCreationValidator, partCreationValidation, productsController.storePart);

router.get("/details/:postID", productsController.details);

router.get("/edit/:productType/:productID", authMiddleware, productOwner, productsController.edit);
router.put("/edit/vehicle/:productID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), vehicleCreationValidator,
vehicleCreationValidation, productsController.updateVehicle);
router.put("/edit/part/:productID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), partCreationValidator,
partCreationValidation, productsController.updatePart);

router.post("/question/:postID", authMiddleware, productsController.question);

router.get("/deleteImage/:productType/:productID", authMiddleware, productOwner, productsController.deleteImage);
router.delete("/delete/:productType/:productID", authMiddleware, productOwner, productsController.delete);

router.get("/search", urlClearner, productsController.search);
router.get("/searchBar/:searchValue?", urlClearner, productsController.searchBar);

router.get("/favourites/add/:postID", authMiddleware, productsController.addFavourite)
router.get("/favourites/delete/:postID", authMiddleware, productsController.deleteFavourite)

router.get("/testing", productsController.testingModel)
*/
module.exports = router;