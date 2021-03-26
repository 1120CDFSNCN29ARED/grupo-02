const express = require("express");

const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const router = express.Router();

router.get("/", adminAuthMiddleware, adminController.display);

router.get("/:productType", adminController.productAdmin)

module.exports = router;
