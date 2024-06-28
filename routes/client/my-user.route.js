const express = require("express");
const router = express.Router();  
const multer = require("multer");
const upload = multer();

const uploadCloudMiddleware = require("../../middlewares/client/uploadCloud.middleware.js");

const controller = require("../../controllers/client/my-user.controller.js");

const uploadFields = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover-photo', maxCount: 1 }
  ]);

router.get('/:id', controller.index);

router.get('/edit/:id', controller.changeMyProfile);

router.patch('/edit/:id', uploadFields, uploadCloudMiddleware.uploadSingle, controller.changeMyProfilePatch);

module.exports = router;