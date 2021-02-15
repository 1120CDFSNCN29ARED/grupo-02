const express = require("express");

/* Routes */
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes")

/* Controllers */
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/search", mainController.search);

/* Admin */
router.use("/admin", adminRoutes);

/* Products */
router.use("/products", productsRoutes);

/* Cart */
router.use("/cart", cartRoutes)



module.exports = router;