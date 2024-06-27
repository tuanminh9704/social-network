const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/my-user.controller.js");

router.get('/:id', controller.index);

router.get('/edit/:id', controller.changeMyProfile);

// router.patch('/change/:id', controller.changeMyProfilePatch);

module.exports = router;