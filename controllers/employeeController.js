const Employee = require("../models/employeeSchema");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Hr = require("../models/hrSchema");
const multer  = require('multer')
const upload = multer({ dest: '' })
exports.addEmployee = async(req,res) =>{
    try{
        let u = req.user;
        console.log(u.username)
        const hr = await Hr.findOne({username:u.username})
        if(!hr){
            return res.status(400).json("Invalid Authorization");
        }

        const {name,jobTitle,city,salary,profilePic,cv,username,password} = req.body;
        const salt =10;
        let hashedPassword = await bcrypt.hash(password,salt);
        const employee = await Employee({name,jobTitle,city,salary,profilePic,cv,username,password:hashedPassword});
        await employee.save();

        res.status(200).json(employee);
    }
    catch(e){
        console.log(e);
        // res.status(400).json(e)
    }
}

exports.fetchAllEmployees = async(req,res) =>{
    try{
        let user = req.user;
        const emp = await Hr.findOne({username:user.username});
        if(!emp){
            return res.status(404).json("Invalid AuthorIzation");
        }

        let employee = await Employee.find();
        res.status(200).json(employee);
    }
    catch(e){
        console.log(e);
    }
    
}


exports.employeeLogin =async(req,res)=>{
    try{
        const {username,password} = req.body;
        const employee = await Employee.findOne({username:username});
        if(employee==undefined || employee==null){
            return res.status(404).json("Invalid Credentials ");
        }
        const result = await bcrypt.compare(password,employee.password);
        if(!result){

        return res.status(404).json("Invalid Credentials");
        }
        const Secrete_key = "85154523154";
        const token = jwt.sign({username:employee.username},Secrete_key,{expiresIn:"2h"});

        res.status(200).json(token);
    }
    catch(e){
        console.log(e);
    }
}

// exports.uploadFile = async(req,res) =>{
//     try{
//         const file = req.file.filename;
//         const filetype = req.file.filetype
//         res.status(200).json({
//             'file':file,
//             'filetype':filetype
//         })
//     }
//     catch(e){
//         console.log(e)
//     }
// }

exports.uploadCV =  async (req,res)=>{
    try{
        let obj = req.user; 
    let username = obj.username; 

    let employee = await Employee.findOne({'username': username})

    if(employee === undefined || employee == null) 
        return res.status(400).json({'msg': 'Invalid Credentials!!'})

    if(!req.file){
        return res.status(400).json({'msg': 'No File detected!!'})
    }

    const multerFileName = req.file.filename; 
    const mimeType = req.file.mimetype;
    const originalFileName = req.file.originalname;
    const fileExtension = mimeType.split('/').pop()

    const allowedExtensions = ['docx', 'pdf']; 
    if(!allowedExtensions.includes(fileExtension)){
        return res.status(400).json({'msg': 'File Not allowed!! Allowed Types ' + allowedExtensions})
    }
    employee.cv = multerFileName + '.' + fileExtension

    employee = await employee.save(employee);
    res.json( employee);
    }
    catch(err){
        return res.status(400).json(err)
    }
}


exports.uploadProfile = async(req,res) =>{
    try{
        let username = req.user.username;
        let emp = await Employee.findOne({username:username})
        if(!emp){
            return res.status(400).json("No such Employee");
        }
        let filena = req.file.filename;
        let mimeTy = req.file.mimetype;
        let fileExt = mimeTy.split("/").pop()
        const allowed = ["jpeg","png"]
        if(!allowed.includes(fileExt)){
            return res.status(400).json("Invalid File format")

        }

        let savingName = filena +"."+ fileExt

        emp.profilePic = savingName;
        emp = await emp.save(emp);
        res.json(emp);
    }
    catch(e){
        console.log(e); 
    }
}


exports.getEmployeeByToken = async(req,res) =>{
    try{    
        let username = req.user.username;
        let emp = await Employee.findOne({username:username})
        if(!emp){
            return res.status(400).json("No Such employee");
        }
        res.status(200).json(emp);
    }
    catch(e){

    }
}

exports.updateEmployee = async(req,res)=>{
    try{
        let empObj = req.body;
        let emp = await Employee.findOne({username:empObj.username})
        if(!emp){
            return res.status(400).json("No such Employee")
        }
        emp.name = empObj.name;
        emp.jobTitle = empObj.jobTitle;

        emp.city = empObj.city;
        emp.salary = empObj.salary;

        await emp.save();
        res.status(emp);
    }
    catch(e){
console.log(e);
    }
}