const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/api/productsController");

router.get("/", productsController.all);
router.get("/id/:productID", productsController.byID);
router.get("/type/:productType", productsController.byProductType);
router.get("/brand/:brandID", productsController.byBrandID);
router.get("/model/:modelID", productsController.byModelID);
router.get("/vehicle/:vehicleID", productsController.byVehicleID);
router.get("/part/:partID", productsController.byPartID);

router.post("/create", productsController.create);

router.put("/update/:productID", productsController.update);

router.delete("/delete/:productID", productsController.delete);


module.exports = router;