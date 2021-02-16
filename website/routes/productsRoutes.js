const express = require("express");

const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/create/:productType?", productsController.create)
router.get("/:productType/details/:productID", productsController.details);
router.get("/:productType/edit/:productID", productsController.edit);


module.exports = router;