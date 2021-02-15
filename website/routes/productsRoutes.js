const express = require("express");

const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/:productType/details/:productID", productsController.details)


module.exports = router;