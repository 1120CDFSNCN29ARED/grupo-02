const express = require("express");
const router = express.Router();

const usersController = require('../../controllers/api/usersController');

/* const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
const adminAuthMiddleware = require("../../middlewares/adminAuthMiddleware");
const {
	registrationValidationRules,
	registrationValidation,
} = require("../../middlewares/registrationValidator");
const {
	loginValidationRules,
	loginValidation,
} = require("../../middlewares/loginValidator"); */


//Login
//router.get('/login', guestMiddleware, usersController.login);
//router.post("/login", loginValidationRules(), loginValidation, usersController.loginProcess);

//Logout
//router.get('/logout/', usersController.logout);

//General
router.get('/', usersController.all);
router.get('/:userID', usersController.byID);
router.get("/roles/:role", usersController.byRole); //No funciona bien! Separar las funciones en el controler para no cruizar servicios.

//Create user
router.post('/create', usersController.create);

//Update User
router.put('/:userID/update', usersController.update);

//Delete User
//router.delete('/:userID/delete,usersController.delete);

//Routes for Favourites
router.get('/:userID/favourites', usersController.getFavourites)
router.put("/:userID/favourites/:event/:postID", usersController.updateFavourites);



//Routes for Carts

module.exports = router;