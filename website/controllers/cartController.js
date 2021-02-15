const parts = require("../json/parts.json");
const carts = require("../json/carts.json");

const cartController = {
    details: (req, res) => {
        let cart = carts.find(cart => cart.cartID === parseInt(req.params.cartID, 10));
        let items = [];
        cart.items.forEach(item => {
            items.push(parts.find(part => part.adID  === item));
        });
        res.render("cart",{items: items})
    }
}

module.exports = cartController;