const express = require("express");
const router = express.Router();

const modelsController = require("../../controllers/api/modelsController");

router.get("/", modelsController.all);
router.get("/id/:modelID", modelsController.byID);
router.get("/byProductType", modelsController.byProductType);
router.get("/byBrandID/:brandID", modelsController.byBrandID);

router.post("/create", modelsController.create);

router.put("/update/:modelID", modelsController.update);

router.delete("/delete/:modelID", modelsController.delete);


module.exports = router;