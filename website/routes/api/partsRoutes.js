const express = require("express");
const router = express.Router();

const partsController = require("../../controllers/api/partsController");

router.get("/", partsController.all);
router.get("/id/:partID", partsController.byID);

router.post("/create", partsController.create);

router.put("/update/:partID", partsController.update);

router.delete("/delete/:partID", partsController.delete);


module.exports = router;