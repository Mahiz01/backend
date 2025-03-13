const express = require("express");
const { addHr, hrSignIn } = require("../controllers/hrController");

const router = express.Router();

router.post("/add",addHr);
router.post("/login",hrSignIn);

module.exports=  router;
