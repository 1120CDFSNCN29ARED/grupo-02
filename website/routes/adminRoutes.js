const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.display);

router.get("/:productType", adminController.productAdmin)

module.exports = router;
