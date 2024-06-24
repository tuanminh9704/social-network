const express = require("express");
const router = express.Router();  

const controller = require("../../controllers/client/my-user.controller.js");

router.get('/:id', controller.index);

module.exports = router;