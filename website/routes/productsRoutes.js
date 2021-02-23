const express = require("express");

const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/create/:productType?", productsController.create);
router.post("/create/:productType", productsController.store);

router.get("/details/:productType/:productID", productsController.details);

router.get("/edit/:productType/:productID", productsController.edit);
router.put("/edit/:productType/:productID", productsController.update);

module.exports = router;