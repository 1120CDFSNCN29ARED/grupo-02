const usersService = require('../../services/usersService');
const bcryptjs = require('bcryptjs');
const userAccessService = require('../../services/userAccessService');
const favouritesService = require('../../services/favouritesService');

const usersController = {
  all: async (req, res) => {
    const users = await usersService.findAll();
    return res.status(200).json(users);
  },
  byID: async (req, res) => {
    const user = await usersService.findByPk(req.params.userID);
    return res.status(200).json(user);
  },
  byRole: async (req, res) => {
    const users = await usersService.findAllByRoleName(req.params.role);
    return res.status(200).json(users);
  },
  create: async (req, res) => {
    const newUser = {
      ...req.body
    };
    delete newUser.password;
    delete newUser.role;

    const password = bcryptjs.hashSync(req.body.password, 10);
    const roleName = req.body.role;
    const result = await usersService.create(newUser, roleName, password);
    //Aqui llama userAccess Serviuce => newUser y roleName password
    return res.status(201).json(result);
  },
  update: async (req, res) => {
    const newData = {
      ...req.body
    };
    delete newData.password;
    delete newData.roleID;
    //delete {password, roleID} newData
    
    const newAccessData = {};
		req.body.password ? newAccessData.password = bcryptjs.hashSync(req.body.password, 10) : null;
    req.body.roleID ? newAccessData.roleID = req.body.roleID : null;
    
    const result = await usersService.update(req.params.userID, newData).catch(error => error);
    
    const newUserName = result.userName;
    if (newAccessData != {}) {
      console.log("Updating the UserAcess Logs");
			const updateUserAccess = await userAccessService.update(
				newUserName,
				newAccessData
			);
		}
    return res.status(202).json(result);
  },
  delete: async (req, res) => {
    const userID = req.params.userID;
    //Check if user has active posts, active cart, active favourites, active anything => 
    //If no active entities related to the user then call usersService.delete(userID) && then call usersAccessService.delete(userName);
    //If related entities are found then raise alert and obtain confirmation => proceed to set all active to false, before calling delete.
  },
  getFavourites: async (req, res) => {
    const userID = req.params.userID;
    const result = await favouritesService.findAll(userID);
    res.status(200).json(result);
  },
  updateFavourites: async (req, res) => {
    const event = req.params.event;
    const postID = req.params.postID;
    const userID = req.params.userID;
    
    if (event == 'add') {
      const result = await favouritesService.addFavourite(userID, postID);
      return res.status(201).json(result);
    }
    if (event == "delete") {
			const result = await favouritesService.deleteFavourite(userID, postID);
			return res.status(204).json(result);
		}
  }
};

module.exports = usersController;
