const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/chat.controller");

router.get('/', controller.roomChat);

router.get('/:roomChatId', controller.index);

// router.get("/send-location/:roomChatId", controller.sendLocation);

module.exports = router;