const express = require("express");
const router = express.Router();  
const multer = require("multer");
const upload = multer();

const uploadCloudMiddleware = require("../../middlewares/client/uploadCloud.middleware");

const controller = require("../../controllers/client/home.controller");

router.get('/', controller.index);


router.post('/post/create', upload.single("thumbnail"), uploadCloudMiddleware.uploadSingle, controller.createPost);

module.exports = router;