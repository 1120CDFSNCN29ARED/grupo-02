const express = require("express");
const router = express.Router();

const apiController = require("../../controllers/api/apiController");

const brandsRoutes = require("./brandsRoutes");
const modelsRoutes = require("./modelsRoutes");
const versionsRoutes = require("./versionsRoutes");
const usersRoutes = require("./usersRoutes");

router.use("/brands", brandsRoutes);
router.use("/models", modelsRoutes);
router.use("/versions", versionsRoutes);
router.use("/users", usersRoutes);

/*
router.get("/modelsByBrand/:brandID", apiController.modelsByBrand);
router.get("/versions/:versionID?", apiController.versions);
router.get("/versionsByModel/:modelID", apiController.versionsByModel);*/

module.exports = router;