const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/brands/:brandID?", apiController.brands);
router.get("/models/:modelID?", apiController.models);
router.get("/modelsByBrand/:brandID", apiController.modelsByBrand);
router.get("/versions/:versionID?", apiController.versions);
router.get("/versionsByModel/:modelID", apiController.versionsByModel);

module.exports = router;