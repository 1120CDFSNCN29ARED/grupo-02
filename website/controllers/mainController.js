const mmav = require('./mmav.js');

const usersService = require('../services/usersService.js');
const postsService = require('../services/postsService.js');
const getPostData = require('../middlewares/getPostData.js');
const brandsService = require('../services/brandsService.js');

const mainController = {
    index: async (req, res) => {   
        const users = await usersService.findAll();
        const publishedPosts = await postsService.published();
        const vehicles = [];
        const parts = [];
        for(publishedPost of publishedPosts){
            const postData = await getPostData(publishedPost);
            if(postData.post.productType === "vehicle"){
                vehicles.push(postData);
            }
            else if(postData.post.productType === "part"){
                parts.push(postData);
            }
        }

        const partBrands = await brandsService.findByProductType({makesParts: true});
        const vehicleBrands = await brandsService.findByProductType({car: true, motorcycle: true, pickup: true, truck: true});

        res.render("index", { users, mmav, vehicleBrands, partBrands, vehicles, parts});
     },    
};

module.exports = mainController;
