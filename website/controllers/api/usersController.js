const usersService = require('../../services/usersService');

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
  }
};

module.exports = usersController;
