const express = require("express");
const router = express.Router();

/* Routes */
const postsRoutes = require("./postsRoutes");
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes")
const usersRoutes = require('./usersRoutes');
const apiRoutes = require('./api/apiRoutes');

//Controller
const mainController = require("../controllers/mainController");

//Main
router.get("/", mainController.index);

//Admin
router.use("/admin", adminRoutes);

//Users
router.use("/users", usersRoutes)

//Products
router.use("/products", productsRoutes);

//Posts
router.use("/posts",postsRoutes);

//Cart
router.use("/cart", cartRoutes)

//api
router.use("/api", apiRoutes);

module.exports = router;