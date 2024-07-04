const express = require("express");
const router = express.Router();  
const multer = require("multer");
const upload = multer();

const uploadCloudMiddleware = require("../../middlewares/client/uploadCloud.middleware");

const controller = require("../../controllers/client/home.controller");

router.get('/', controller.index);

router.post('/post/create', upload.single("thumbnail"), uploadCloudMiddleware.uploadSingle, controller.createPost);

router.patch('/post/like/:status/:postId', controller.like);

router.get("/post/comment/:postId", controller.getComment);

router.post("/post/comment/:postId", controller.createComment);


module.exports = router;