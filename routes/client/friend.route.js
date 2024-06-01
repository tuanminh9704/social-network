const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/friend.controller");

router.get('/', controller.index);

router.get("/suggestions", controller.suggestions);

router.get("/accepts", controller.accepts);

router.get("/lists", controller.friendList);

router.get("/requests", controller.friendRequest);

module.exports = router;