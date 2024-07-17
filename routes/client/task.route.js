const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/task.controller");

router.get("/", controller.index);

router.post("/create", controller.createTaskPost);

router.patch("/success/:id", controller.taskSuccess);

router.delete("/delete/:id", controller.taskDelete);

router.get("/edit/:id", controller.taskEdit);

router.patch("/edit/:id", controller.taskEditPatch);

module.exports = router;