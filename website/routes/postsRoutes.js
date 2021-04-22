const express = require("express");
const multer = require('multer');
const path = require('path');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const postsController = require("../controllers/postsController");
const {postCreationValidator, postCreationValidation} = require("../middlewares/postCreationMiddleware");
const productOwner = require("../middlewares/productOwnerMiddleware");
const urlClearner = require("../middlewares/urlCleaner");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, path.join(__dirname, '../public/img/posts'));
      
    },
    filename: function (req, file, cb) { 
      const newFileName = `post-image-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, newFileName);
    },
  });
  
const uploadFile = multer({ storage });

router.get("/create/:productType?", authMiddleware, postsController.create);
router.post("/create/:productType", authMiddleware, uploadFile.fields([{ name: 'images' }]), postCreationValidator, postCreationValidation, postsController.storePost);

router.get("/details/:postID", postsController.details);

router.get("/edit/:productType/:postID", authMiddleware, productOwner, postsController.edit);
router.put("/edit/:postID", authMiddleware, productOwner, uploadFile.fields([{ name: 'images' }]), postCreationValidator,
postCreationValidation, postsController.update);
/*
router.get("/edit/:productType/:postID", authMiddleware, productOwner, postsController.edit);
router.put("/edit/vehicle/:postID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), vehicleCreationValidator,
vehicleCreationValidation, postsController.updateVehicle);
router.put("/edit/part/:postID", authMiddleware, productOwner, uploadFile.fields([{ name: 'productImages' }]), partCreationValidator,
partCreationValidation, postsController.updatePart);

router.post("/question/:postID", authMiddleware, postsController.question);

router.get("/deleteImage/:productType/:postID", authMiddleware, productOwner, postsController.deleteImage);
router.delete("/delete/:productType/:postID", authMiddleware, productOwner, postsController.delete);

router.get("/search", urlClearner, postsController.search);
router.get("/searchBar/:searchValue?", urlClearner, postsController.searchBar);

router.get("/favourites/add/:postID", authMiddleware, postsController.addFavourite)
router.get("/favourites/delete/:postID", authMiddleware, postsController.deleteFavourite)

router.get("/testing", postsController.testingModel)*/

module.exports = router;