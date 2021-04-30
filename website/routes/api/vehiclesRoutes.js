const express = require("express");
const router = express.Router();

const vehiclesController = require("../../controllers/api/vehiclesController");

router.get("/", vehiclesController.all);
router.get("/id/:vehicleID", vehiclesController.byID);
router.get("/byVersionID/:versionID", vehiclesController.byVersionID);

router.post("/create", vehiclesController.create);

router.put("/update/:vehicleID", vehiclesController.update);

router.delete("/delete/:vehicleID", vehiclesController.delete);


module.exports = router;