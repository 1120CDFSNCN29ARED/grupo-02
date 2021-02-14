const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/:cartID/details/", cartController.details)


module.exports = router;