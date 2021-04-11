const express = require("express");
const router = express.Router();

const modelsController = require("../../controllers/api/modelsController");

router.get("/", modelsController.all);
router.get("/id/:modelID", modelsController.byID);
router.get("/byProductType", modelsController.byProductType);
router.get("/byBrandID/:brandID", modelsController.byBrandID);
module.exports = router;