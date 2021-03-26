const fs = require('fs');
const path = require('path');
const Cart = require('../models/Cart');

const parts = require("../json/parts.json");
const vehicles = require("../json/vehicles.json");
const carts = require("../json/carts.json");
const { reset } = require('nodemon');

const cartFilePath = path.join(__dirname, '../json/carts.json');
const cartController = {
    details: (req, res) => {       
        if (req.session.cartID == 'guest') {
            
            return res.send("Guest Cart Functionality not yet implemented");
        }
        let cart = Cart.findCartByPk(req.session.cartID);
        let items = Cart.getCartItems(cart);
        res.render("cart",{cart, items})
    },
    addToCart: (req, res, next) => {
        Cart.addToCart(req.session.cartID, req.params.itemID);
        /* let cart = Cart.findCartByPk(req.params.cartID);
        let items = Cart.getCartItems(cart); */
        res.redirect(`/products/details/part/${req.params.itemID}`);
    },
    removeFromCart: (req, res, next) => {
        Cart.removeFromCart(req.session.cartID, req.params.itemID)
        console.log(`CartID: ${req.session.cartID} and itemID: ${req.params.itemID}`);
        /* let cart = Cart.findCartByPk(req.params.cartID);
        let items = Cart.getCartItems(cart); */
        res.redirect(`/cart/details/`);
    },
    updateItemQuantity: (req, res, next) => {
        let cartID = req.session.cartID;
        let itemID = req.params.itemID;
        let qty = req.body.quantity;
        Cart.updateItemQuantity(cartID, itemID, qty);
        res.redirect(`/cart/details/`);
    }
}

module.exports = cartController;