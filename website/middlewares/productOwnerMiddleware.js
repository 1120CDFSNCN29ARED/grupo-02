const getPostData = require('./getPostData');
const postsService = require('../services/postsService');


const productOwner = async (req, res, next) => {
    const post = await postsService.findByPk(req.params.postID);
    const postData = await getPostData(post);
    if(req.session.assertUserLogged.userID !== postData.seller.sellerID){
        return res.redirect("/users/register");
    }
    return next();
}

module.exports = productOwner;