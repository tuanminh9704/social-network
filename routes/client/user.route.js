const express = require("express");
const router = express.Router();  
const validates = require("../../validates/client/user.validate");

const controller = require("../../controllers/client/user.controller");

router.get('/login', controller.login);

router.post('/login', validates.checkLogin, controller.loginPost);

router.get('/register', controller.register);

router.post('/register', validates.checkUser, controller.registerPost);

router.get('/logout', controller.logout);

router.get('/password/forgot', controller.forgot);

router.post('/password/forgot', validates.validateForgotPassword, controller.forgotPost);

router.get('/password/otp', controller.submitOtp);

router.post('/password/otp', validates.validateOtp, controller.submitOtpPost);

router.get('/password/reset', controller.resetPassword);

router.post('/password/reset',validates.validateResetPassword, controller.resetPasswordPost);

module.exports = router;