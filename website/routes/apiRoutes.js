const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/versions/:brandID?", apiController.versions);

module.exports = router;