const express = require("express");
const router = express.Router();

const apiController = require("../../controllers/api/apiController");

const modelsRoutes = require("./modelsRoutes");

router.get("/brands/:brandID?", apiController.brands);
router.use("/models", modelsRoutes);
router.get("/modelsByBrand/:brandID", apiController.modelsByBrand);
router.get("/versions/:versionID?", apiController.versions);
router.get("/versionsByModel/:modelID", apiController.versionsByModel);

module.exports = router;