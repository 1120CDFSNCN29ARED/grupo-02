const express = require("express");
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const activeCart = require('../middlewares/activeCart');
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/details/", authMiddleware, userLoggedMiddleware, activeCart, cartController.details);
router.get(
	"/addItem/:itemID",
	authMiddleware,
	userLoggedMiddleware,
	activeCart,
	cartController.addToCart
);
router.put(
	"/updateItem/:itemID",
	authMiddleware,
	userLoggedMiddleware,
	activeCart,
	cartController.updateItemQuantity
);
router.get(
	"/removeItem/:itemID",
	authMiddleware,
	userLoggedMiddleware,
	activeCart,
	cartController.removeFromCart
);

module.exports = router;