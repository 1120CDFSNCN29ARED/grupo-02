const brands = require("./brands");
const mmav = require("./mmav");
let product = {
    type: ''
};
const adminController = {
    display: (req, res) => {
        res.render("admin", { brands: brands, mmav: mmav });
    },
    productAdmin: (req, res) => { 
        const productType = req.params.productType;
        if (productType == 'vehicle') {
            product.type = 'vehicle'
            console.log("VEHICLE:" +product);
        } else{
            product.type = 'part'
            console.log("PART:" + product);
        }
        res.render("adminProduct", { brands:brands, mmav:mmav,product: product });
    },
    
};
module.exports = adminController;