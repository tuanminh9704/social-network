const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/chat.controller");

router.get('/', controller.index);

// router.get('/roomChatId', controller.getRoomChat);

module.exports = router;