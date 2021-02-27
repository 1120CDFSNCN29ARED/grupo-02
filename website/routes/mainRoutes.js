const express = require("express");

/* Routes */
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes")
const usersRoutes = require('./usersRoutes');

/* Controllers */
const mainController = require("../controllers/mainController");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/search", mainController.search);

/* Admin */
router.use("/admin", adminRoutes);

/* Users */
router.use("/users", usersRoutes)

router.get("/register", usersController.create);
router.post("/register", usersController.store);

/* Products */
router.use("/products", productsRoutes);

/* Cart */
router.use("/cart", cartRoutes)



module.exports = router;