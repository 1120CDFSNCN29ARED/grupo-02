const express = require("express");
const router = express.Router();

const postsController = require("../../controllers/api/postsController");

router.get("/", postsController.all);
router.get("/id/:postID", postsController.byID);
router.get("/published", postsController.published);
router.get("/onSale", postsController.onSale);
router.get("/seller/:sellerID", postsController.bySellerID);
router.get("/province/:provinceID", postsController.byProvinceID);
router.get("/locality/:localityID", postsController.byLocalityID);
//router.get("/product/:productID", postsController.byProductID);

router.post("/create", postsController.create);

router.put("/update/:postID", postsController.update);

router.delete("/delete/:postID", postsController.delete);


module.exports = router;