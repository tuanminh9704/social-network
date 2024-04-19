const express = require("express");
const router = express.Router();  
const validates = require("../../validates/client/user.validate");

const controller = require("../../controllers/client/user.controller");

router.get('/login', controller.login);

router.post('/login', validates.checkLogin, controller.loginPost);

router.get('/register', controller.register);

router.post('/register', validates.checkUser, controller.registerPost);

module.exports = router;