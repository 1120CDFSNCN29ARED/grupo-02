const usersService = require('../../services/usersService');
const bcryptjs = require('bcryptjs');

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
      ...req.body.data
    };
    const password = bcryptjs.hashSync(req.body.password, 10);
    const roleName = req.body.role;
    const result = await usersService.create(newUser, roleName, password);
    
    return res.status(201).json(result);
  }
};

module.exports = usersController;
