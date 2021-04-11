const express = require("express");
const router = express.Router();

const brandsController = require("../../controllers/api/brandsController");

router.get("/", brandsController.all);
router.get("/id/:brandID", brandsController.byID);
router.get("/byName/:brandName", brandsController.byName);
router.get("/byProductType", brandsController.byProductType);
module.exports = router;