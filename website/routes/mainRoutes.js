const express = require("express");

const productsRoutes = require("./productsRoutes");
const mainController = require("../controllers/mainController");

const router = express.Router();
router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/search", mainController.search);

router.use("/products", productsRoutes)


module.exports = router;