const express = require("express");
const { addEmployee, fetchAllEmployees, employeeLogin, uploadFile, uploadCV, uploadProfile, getEmployeeByToken, updateEmployee } = require("../controllers/employeeController");
const auth = require("../middlewares/auth");
const multer = require('multer')
const router = express.Router();
const upload = multer({dest:'C:/Users/mahizsk/Downloads/Employee_Task_Manager/emtsui/public/images'})
router.post("/addEmployee",auth,addEmployee);
router.get("/getEmployee", auth, fetchAllEmployees);
router.post("/login",employeeLogin);
router.post("/upload-cv",upload.single('file'),auth,uploadCV);
router.post("/upload-profile",upload.single('profile'),auth,uploadProfile);
router.get("/getEmployeeByToken",auth,getEmployeeByToken);
router.post('/UpdateEmp',updateEmployee)
module.exports= router;