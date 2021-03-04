const express = require("express");
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const path = require('path');
const guestMiddleware = require('../middlwares/guestMiddleware');
const authMiddleware = require('../middlwares/authMiddleware');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

//Middlewares
const validations = [
  body("userName")
    .notEmpty()
    .withMessage("Por favor elige un nomber de usaurio"),
  body("first_name").notEmpty().withMessage("Por favor ingrese su nombre"),
  body("last_name").notEmpty().withMessage("Por favor ingrese su apellido"),
  body("id_number").notEmpty().withMessage("Por favor ingrese su DNI"),
  body("email")
    .notEmpty().withMessage("Por favor ingrese un email").bail()
    .isEmail().withMessage("Por favor ingrese un email válido"),
  body("telephone").notEmpty().withMessage("Por favor ingrese su numero de teléfono"),
  body("province").notEmpty().withMessage("Por favor ingrese su provincia"),
  body("city").notEmpty().withMessage("Por favor ingrese su ciudad"),
  body("neighbourhood").notEmpty().withMessage("Por favor ingrese su barrio"),
  body("postal_code")
    .notEmpty()
    .withMessage("Por favor ingrese su código postal"),
  body('password').notEmpty().withMessage('Por favor ingrese una contraseña'),
  body('image').custom((value, { req })=> {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.jpeg', 'png', '.gif'];    
    if (!file) {
      throw new Error('Por favor subir una imagen');
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Las extensiones de archvo permitido son: ${acceptedExtensions.join(', ')}`);
      }
    };
    return true;
  }),
];
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
router.post("/login", usersController.loginProcess);

router.get("/register",guestMiddleware, usersController.create);
router.post("/register", uploadFile.single("image"),validations, usersController.store);

router.get('/', usersController.index);
router.get('/details/:userId', usersController.details);
router.get("/profile", authMiddleware, usersController.profile);

router.get('/edit/:userId', usersController.edit);
router.put('/edit/:userId',uploadFile.single("image"), usersController.update);

router.get('/logout/', usersController.logout);

router.delete("/delete/:userId", usersController.destroy);

module.exports = router;