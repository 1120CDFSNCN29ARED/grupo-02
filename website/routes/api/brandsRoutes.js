const express = require("express");
const router = express.Router();

const brandsController = require("../../controllers/api/brandsController");

router.get("/", brandsController.all);
router.get("/id/:brandID", brandsController.byID);
router.get("/byName/:brandName", brandsController.byName);
router.get("/byProductType", brandsController.byProductType);
router.get("/:id/models/", brandsController.byIDIncludeModels);

router.post("/create", brandsController.create);

router.put("/update/:brandID", brandsController.update);

router.delete("/delete/:brandID", brandsController.delete);



module.exports = router;