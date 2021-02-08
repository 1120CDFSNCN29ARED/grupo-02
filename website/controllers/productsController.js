const productsController = {
    details: (req, res) => {
        res.render("productDetails",{productType: req.params.productType, productID: req.params.productID});
    }

}

module.exports = productsController;