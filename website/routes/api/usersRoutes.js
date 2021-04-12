const express = require("express");
const router = express.Router();

const usersController = require('../../controllers/api/usersController');

router.get('/', usersController.all);
router.get('/:userID', usersController.byID);
router.get("/roles/:role", usersController.byRole);


module.exports = router;