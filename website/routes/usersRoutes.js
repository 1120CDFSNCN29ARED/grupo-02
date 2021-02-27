const express = require("express");

const usersController = require('../controllers/usersController');

const router = express.Router();

//I have placed these two routes in the mainRoutes file as they are not accessed via /users/register but rather directly via /register
//router.get('/register', usersController.create);
//router.post('/regsiter', usersController.store);

router.get('/', usersController.index);
router.get('/details/:userId', usersController.detail);

router.get('edit/:userId', usersController.edit);
router.put('edit/:userId', usersController.update);

router.delete("/:userId", usersController.destroy);

module.exports = router;