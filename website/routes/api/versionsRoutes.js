const express = require("express");
const router = express.Router();

const versionsController = require("../../controllers/api/versionsController");

router.get("/", versionsController.all);
router.get("/id/:versionID", versionsController.byID);
router.get("/byBrandID/:brandID", versionsController.byBrandID);
router.get("/byModelID/:modelID", versionsController.byModelID);

router.post("/create", versionsController.create);

router.put("/update/:versionID", versionsController.update);

router.delete("/delete/:versionID", versionsController.delete);


module.exports = router;