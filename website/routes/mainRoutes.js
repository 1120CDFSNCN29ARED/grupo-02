const express = require("express");
const router = express.Router();

/* Routes */
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes")
const usersRoutes = require('./usersRoutes');

/* Controllers */
const mainController = require("../controllers/mainController");


router.get("/", mainController.index);

/* Admin */
router.use("/admin", adminRoutes);

/* Users */
router.use("/users", usersRoutes)

/* Products */
router.use("/products", productsRoutes);

/* Cart */
router.use("/cart", cartRoutes)

module.exports = router;