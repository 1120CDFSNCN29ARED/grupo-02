const express = require("express");
const router = express.Router();

const usersController = require('../../controllers/api/usersController');


//Login
//router.get('/login', guestMiddleware, usersController.login);
//router.post("/login", loginValidationRules(), loginValidation, usersController.loginProcess);

//Logout
//router.get('/logout/', usersController.logout);

//General
router.get('/', usersController.all);
router.get('/:userID', usersController.byID);
router.get("/roles/:role", usersController.byRole); //No funciona bien! Separar las funciones en el controler para no cruizar servicios.
router.get("/byUserName/:userName", usersController.byUserName);
router.get("/byEmail/:email", usersController.byEmail);
//Create user
router.post('/create', usersController.create);

//Update User
router.put('/:userID/update', usersController.update);

//Delete User
//router.delete('/:userID/delete,usersController.delete);

//Routes for Favourites
router.get('/:userID/favourites', usersController.getFavourites)
router.put("/:userID/favourites/add/:postID", usersController.addFavourites);
router.put("/:userID/favourites/delete/:postID", usersController.deleteFavourites);



//Routes for Carts

module.exports = router;