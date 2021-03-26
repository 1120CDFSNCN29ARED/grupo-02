//@TODO: Create new cart if no active ("PENDING") cart is detected.
const Cart = require('../models/Cart');
const activeCart = (req, res, next) => {
  res.locals.activeCart = false;
  let userID;
  if (req.session.userId) {
    userID = req.session.userId;
  } else {
    // Need to think this through carefully.
    userID = "guest";
  }
  let userCart = Cart.findCartByField('userID', userID);
  if (userCart) {
    req.session.cartID = userCart.cartID;
  } else {
    console.log("Creating a new cart");
    Cart.create(userID);
    return res.redirect('/cart/details');
  }

  next();
}

module.exports = activeCart;