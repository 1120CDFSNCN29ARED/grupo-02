const parts = require("../json/parts.json");
const carts = require("../json/carts.json");

const cartController = {
    details: (req, res) => {
        let cart = carts.find(cart => cart.cartID === parseInt(req.params.cartID, 10));
        let items = [];
        cart.items.forEach(item => {
            let product = parts.find(part => part.adID  === item.adID);
            items.push({product, "quantity": item.quantity});
        });
        res.render("cart",{items})
    }
}

module.exports = cartController;