const productsController = {
    details: (req, res) => {
        res.render("productDetails",
        {
            productType: req.params.productType,
            productID: parseInt(req.params.productID, 10)
        });
    }

}

module.exports = productsController;