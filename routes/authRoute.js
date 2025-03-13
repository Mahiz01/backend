const express = require("express")
const auth = require("../middlewares/auth")
const { getUserInfo, Login } = require("../controllers/authController")

const router = express.Router()

router.get("/user",auth,getUserInfo);
router.post("/login",Login);
module.exports = router;