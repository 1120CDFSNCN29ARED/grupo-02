const Vehicle = require('../models/Vehicle');
const Part = require('../models/Part');


const productOwner = (req, res, next) => {
    if(req.params.productType === "vehicle"){
        product = Vehicle.findVehicleByPk(parseInt(req.params.productID, 10))
    }
    else if(req.params.productType === "part"){
        product = Part.findPartByPk(parseInt(req.params.productID, 10))
    }
    if(req.session.assertUserLogged.userID !== product.userID){
        return res.redirect("/users/register");
    }
    console.log(req.session.assertUserLogged.userID)
    console.log(product.userID)
    next();
}

module.exports = productOwner;