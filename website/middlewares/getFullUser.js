const usersService = require('../services/usersService.js');
const userAccessService = require('../services/userAccessService.js');
const favouritesService = require('../services/favouritesService.js');
const rolesService = require('../services/rolesService.js');
const localitiesService = require('../services/localitiesService.js');
const provincesServices = require('../services/provincesService.js');
const questionsService = require('../services/questionsService.js');

const getFullUser = async (user) => {
    const userAccess = await userAccessService.findOne(user.email);
    const role = await rolesService.findByPk(userAccess.roleID);
    const allFavourites = await favouritesService.findAll(user.userID);
    const locality = await localitiesService.findByPk(user.locationID);
    const province = await provincesServices.findByPk(locality.provinceID);
    const questionCount = await questionsService.countQuestions(user.userID);
    
    let favourites = []
    for (favourite of allFavourites) {
        favourites.push(favourite.dataValues);
    }
    
    const fullUser = {
        ...user.dataValues,
        role: role.roleName,
        favourites,
        provinceID: province.provinceID,
        provinceName: province.provinceName,
        locationName: locality.localityName,
        questionCount
    }

    return fullUser;
}

module.exports = getFullUser;