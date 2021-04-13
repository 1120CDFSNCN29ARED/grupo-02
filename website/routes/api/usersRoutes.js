const express = require("express");
const router = express.Router();

const usersController = require('../../controllers/api/usersController');

router.get('/', usersController.all);
router.get('/:userID', usersController.byID);
router.get("/roles/:role", usersController.byRole); //No funciona bien!

//Create user
router.post('/create', usersController.create);

//Update User
router.put('/:userID/update', usersController.update);
//Delete User
//router.delete('/:userID/delete,usersController.delete);

//Routes for Favourites
//router.get('/:userID/favourites', userController.favourites)

//Routes for Carts

module.exports = router;