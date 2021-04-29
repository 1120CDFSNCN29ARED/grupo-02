const cartsService = require('../services/cartsService');
const cartItemsService = require('../services/cartItemsService');
const postsService = require('../services/postsService');
const getPostData = require('../middlewares/getPostData');
//const Cart = require('../models/Cart');

const cartController = {
    details: async (req, res, next) => {       
        if (req.session.cartID == 'guest') {            
            return res.send("Guest Cart Functionality not yet implemented");
        }
        let cartID = req.session.cartID;
        
        let cart = await cartsService.findByPk(req.session.cartID);
        
        let cartItems = await cartItemsService.findByCartID(cartID);
        let items = [];
        for await (const item of cartItems){            
            let post = await postsService.findByPk(item.dataValues.postID).catch(error => error);
            let postData = await getPostData(post).catch((error) => error);            
            let tempItem = {
                cartItemID: item.dataValues.cartItemID,
                price: item.dataValues.price,
                quantity: item.dataValues.quantity,
                active: item.dataValues.active,
                postID: item.dataValues.postID,
                postData: postData
            };
            items.push(tempItem);
        };
        res.render("cart", { cart, items: items });
    },
    addToCart: async (req, res, next) => {
        //identify activeCart based on User
        //Add item to cartItems with cartID, postID, qty, price, active =true
        let cartID = req.session.cartID;
        let postID = req.params.itemID
        let foundInCart = await itemInCart(cartID, postID);
        if (foundInCart) {
            return res.redirect("/cart/details");
        }
        let quantity = 1;
        let active = true;
        let postData = await postsService.findByPk(postID);
        console.log(postData);
        let price = postData.dataValues.price;
        let itemData = {
            cartID,
            postID,
            quantity,
            price,
            active
        };
        let result = await cartItemsService.add(itemData).catch(error=>error);
        res.redirect('/cart/details');
    },
    removeFromCart: async (req, res, next) => {
        let cartID = req.session.cartID;
        let postID = req.params.itemID;
        let cartItem = await cartItemsService.findByCartAndItemID(cartID, postID);
        console.log(cartItem);
        let cartItemID = cartItem[0].dataValues.cartItemID;
        let result = cartItemsService.delete(cartItemID).catch(error=>error);
        console.log(`CartID: ${req.session.cartID} and itemID: ${req.params.itemID}`);
        res.redirect(`/cart/details/`);
    },
    updateItemQuantity: async (req, res, next) => {
        //add in validations against the current stock limits of the item and that it cannot be negative. If the amount is zero the nremove the item.
        let cartID = req.session.cartID;
        let postID = req.params.itemID;
        let quantity = parseInt(req.body.quantity,10);
        console.log("QTY: ", quantity);
        let newData = {
            cartID,
            postID,
            quantity
        }
        let result = await cartItemsService.update(newData).catch(error => error);
        //Cart.updateItemQuantity(cartID, itemID, qty);
        res.redirect(`/cart/details/`);
    }
}

module.exports = cartController;

async function itemInCart(cartID,postID) {
    let foundInCart = false;
    let result = await cartItemsService.findByCartAndItemID(cartID, postID);
    if (result.length > 0) {
        foundInCart = true;
    } else {
        foundInCart = false;
    }
    return foundInCart;
};