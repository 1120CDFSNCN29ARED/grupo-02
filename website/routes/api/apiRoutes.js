const express = require("express");
const router = express.Router();

const apiController = require("../../controllers/api/apiController");

const brandsRoutes = require("./brandsRoutes");
const modelsRoutes = require("./modelsRoutes");
const versionsRoutes = require("./versionsRoutes");

const productsRoutes = require("./productsRoutes");
const vehiclesRoutes = require("./vehiclesRoutes");
const partsRoutes = require("./partsRoutes");

const usersRoutes = require("./usersRoutes");

const provincesRoutes = require("./provincesRoutes");
const localitiesRoutes = require("./localitiesRoutes");

router.use("/brands", brandsRoutes);
router.use("/models", modelsRoutes);
router.use("/versions", versionsRoutes);
router.use("/users", usersRoutes);

router.use("/products", productsRoutes);
router.use("/vehicles", vehiclesRoutes);
router.use("/parts", partsRoutes);

router.use("/provinces", provincesRoutes);
router.use("/localities", localitiesRoutes);
/*
router.get("/modelsByBrand/:brandID", apiController.modelsByBrand);
router.get("/versions/:versionID?", apiController.versions);
router.get("/versionsByModel/:modelID", apiController.versionsByModel);*/

module.exports = router;