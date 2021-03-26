const brands = require("./brands");
const mmav = require("./mmav");
let product = {
    type: ''
};
const adminController = {
    display: (req, res) => {
        const adminUser = req.session.assertUserLogged;
        res.render("adminDashboard", { user: adminUser, brands: brands, mmav: mmav });
    },
    productAdmin: (req, res) => { 
        const productType = req.params.productType;
        if (productType == 'vehicle') {
            product.type = 'vehicle'
        } else{
            product.type = 'part'
        }
        res.render("adminProduct", { brands:brands, mmav:mmav,product: product });
    },
    
};
module.exports = adminController;