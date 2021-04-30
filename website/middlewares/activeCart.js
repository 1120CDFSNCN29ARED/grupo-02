//@TODO: Create new cart if no active ("PENDING") cart is detected.
const cartsService = require('../services/cartsService');

const activeCart = async (req, res, next) => {
  res.locals.activeCart = false;
  let userID;
  
  if (req.session.assertUserLogged.userID) {
    userID = req.session.assertUserLogged.userID;
  } else {
    userID = "guest";
  }
  
  let userCart = await cartsService.findByUserID(userID);
  console.log("USER CART EXISTS OR THERE ARE ERRORS????", userCart);
  if (userCart.length>0) {
    req.session.cartID = userCart[0].dataValues.cartID;
  } else {
    console.log("No Cart Found --> Creating a new cart");
    let result = await cartsService.create(userID);
    if (!result.errors) {
      req.session.cartID = result.cartID;
    }
    return res.redirect('/cart/details');
  }

  next();
}

module.exports = activeCart;