// const  Admin = require("mongodb")
const Employee = require("../models/employeeSchema")
const Hr = require("../models/hrSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.Login = async(req,res)=>{
    try{
        let {username,password}= req.body

        let hr = await Hr.findOne({username:username});
        if(hr){
            let passwordValidation = bcrypt.compare(password,hr.password);
            
            if(!passwordValidation){
                res.status(400).json("Invalid Credentials")
            }
            const Secrete_key = "85154523154";
            let token = jwt.sign({username:hr.username}, Secrete_key,{expiresIn:'20h'})

            return res.status(200).json({
                'token':token,
                'role': hr.role
            })
        }
        let emp = await Employee.findOne({username:username});
        if(emp){
            let passwordValidation = bcrypt.compare(password,emp.password);
            
            if(!passwordValidation){
                res.status(400).json("Invalid Credentials")
            }
            const Secrete_key = "85154523154";
            let token = jwt.sign({username:emp.username}, Secrete_key,{expiresIn:'20h'})

            return res.status(200).json({
                'token':token,
                'role': emp.role
            })
        }

        return res.status(400).json("Invalid Credentials");
    }
    catch(e){
        console.log(e);
    }
}

exports.getUserInfo = async(req,res)=>{
    try{
        let obj = req.user
        let username = obj.username
        // console.log(obj)
        // console.log(username)
        let user = await Employee.findOne({username:username})
        // console.log(user)
        
        if(user){
            return res.status(200).json(user);
        }
        let admin = await Hr.findOne({username:username})
        // console.log(admin)
        if(admin){
            return res.status(200).json(admin);
        }


        res.status(404).json("Login Denied");
    }
    catch(e){
console.log(e);
    }
}

