const express = require("express");
const { addTask, getAllTask, getTaskById } = require("../controllers/taskController");
const auth = require("../middlewares/auth");

const router = express.Router();
router.post("/addTask",addTask);
router.get("/getTask",auth,getAllTask);
router.post("/gettaskbyId",getTaskById);
module.exports= router;