const express = require("express");
const router = express.Router();

const localitiesController = require("../../controllers/api/localitiesController");

router.get("/", localitiesController.findAll);
router.get("/id/:localityID", localitiesController.findByID);
router.get("/byName/:localityName", localitiesController.findOneByName);
router.get("/nameLike/:localityName", localitiesController.findByName);

router.post("/create", localitiesController.create);

router.put("/update/:localityID", localitiesController.update);

router.delete("/delete/:localityID", localitiesController.delete);



module.exports = router;