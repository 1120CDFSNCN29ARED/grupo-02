const Vehicle = require('../models/Vehicle');


const productOwner = (req, res, next) => {
    product = Vehicle.findVehicleByPk(parseInt(req.params.productID))
    if(req.session.assertUserLogged.userID === product.userID){
        next();
    }
    res.redirect("/users/register");
}

module.exports = productOwner;