const express = require("express");

const productsRoutes = require("./productsRoutes");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.use("/products", productsRoutes)


module.exports = router;