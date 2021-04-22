const usersService = require('../services/usersService.js');
const userAccessService = require('../services/userAccessService.js');
const favouritesService = require('../services/favouritesService.js');
const rolesService = require('../services/rolesService.js');
const localitiesService = require('../services/localitiesService.js');
const provincesServices = require('../services/provincesService.js');

const getFullUser = async (user) => {
    const userAccess = await userAccessService.findOne(user.email);
    const role = await rolesService.findByPk(userAccess.roleID);
    const favourites = await favouritesService.findAll(user.userID);
    const locality = await localitiesService.findByPk(user.locationID);
    const province = await provincesServices.findByPk(locality.provinceID);

    const fullUser = {
        ...user.dataValues,
        role: role.roleName,
        favourites,
        provinceID: province.provinceID,
        provinceName: province.provinceName,
        localityID: locality.localityID,
        localityName: locality.localityName
    }
    return fullUser;
}

module.exports = getFullUser;