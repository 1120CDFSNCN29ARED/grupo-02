const express = require("express");

const productsRoutes = require("./productsRoutes");
const cartRoutes = require("./cartRoutes")
const mainController = require("../controllers/mainController");

const router = express.Router();

router.use("/products", productsRoutes)
router.use("/cart", cartRoutes)


module.exports = router;