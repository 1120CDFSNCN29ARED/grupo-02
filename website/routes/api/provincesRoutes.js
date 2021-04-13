const express = require("express");
const router = express.Router();

const provincesController = require("../../controllers/api/provincesController");

router.get("/", provincesController.findAll);
router.get("/id/:provinceID", provincesController.findByID);
router.get("/name/:provinceName", provincesController.findOneByName);
router.get("/nameLike/:provinceName", provincesController.findByName);

router.post("/create", provincesController.create);

router.put("/update/:provinceID", provincesController.update);

router.delete("/delete/:provinceID", provincesController.delete);



module.exports = router;