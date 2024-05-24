const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/friend.controller");

router.get('/', controller.index);

router.get("/suggestions", controller.suggestions);

router.get("/accepts", controller.accepts);

module.exports = router;