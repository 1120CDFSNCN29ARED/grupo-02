const express = require("express");
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const { registrationValidationRules, registrationValidation } = require('../middlewares/registrationValidator');
const { loginValidationRules, loginValidation } = require('../middlewares/loginValidator');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

//************** MIDDLEWARES ************************
//************** MULTER ************************
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, path.join(__dirname, '../public/img/users'));
    
  },
  filename: function (req, file, cb) { 
    const newFileName = `user-image-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const uploadFile = multer({ storage });

router.get("/login", guestMiddleware, usersController.login);
router.post(
	"/login",
	loginValidationRules(),
	loginValidation,
	usersController.loginProcess
);

router.get("/register",guestMiddleware, usersController.create);
router.post(
	"/register",
	uploadFile.single("image"),registrationValidationRules(),
	registrationValidation,
	usersController.processRegistration
);

router.get('/', adminAuthMiddleware, usersController.index);
router.get('/details/:userId', usersController.details);
router.get("/profile", authMiddleware, usersController.profile);

router.get('/edit/:userId', usersController.edit);
router.put('/edit/:userId',uploadFile.single("image"), usersController.update);

router.get('/logout/', usersController.logout);

router.delete("/delete/:userId", usersController.destroy);

module.exports = router;