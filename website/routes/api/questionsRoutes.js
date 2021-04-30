const express = require("express");
const router = express.Router();

const questionsController = require("../../controllers/api/questionsController");

router.get("/", questionsController.all);
router.get("/id/:questionID", questionsController.byID);
router.get("/user/:userID", questionsController.byUserID);
router.get("/post/:postID", questionsController.byPostID);

router.post("/create", questionsController.create);

router.put("/update/:questionID", questionsController.update);

router.delete("/delete/:questionID", questionsController.delete);


module.exports = router;