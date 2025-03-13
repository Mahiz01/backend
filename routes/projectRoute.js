const express = require("express");
const { addProject, getAllProject, getAllProjectForFrontend } = require("../controllers/projectController");
const auth = require("../middlewares/auth");

const router = express.Router();
router.post("/addProject",auth,addProject);
router.get("/projectsGet",getAllProject);
router.get('/getAllProjects',getAllProjectForFrontend);
module.exports= router;