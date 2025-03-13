const express = require("express");
const { workAddAssign, getAssigns } = require("../controllers/assignController");
const auth = require("../middlewares/auth");
const router = express.Router();
router.post("/addAssign",auth,workAddAssign);
router.get("/getAssign",auth,getAssigns)
// router.get("/getassign",  );

module.exports= router;