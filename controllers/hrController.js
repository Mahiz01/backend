const Hr = require("../models/hrSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.addHr = async(req,res) =>{
    const {username,password}= req.body;
    const salt = 10;
const hashedPassword =await bcrypt.hash(password,salt);
    const hr = new Hr({username,password:hashedPassword});
    await hr.save();
    res.status(200).json(hr);
}


exports.hrSignIn = async(req,res) =>{
    try{
            const {username,password} = req.body;
            const hr = await Hr.findOne({username:username});
            if(!hr){
                return res.status(400).json("Invalid user credentials");
            }
            const out = bcrypt.compare(password,hr.password);

            if(!out){
                return res.status(400).json("Invalid Credentials");
            }
            const Secrete_key = "85154523154";
            const token = jwt.sign({username:hr.username},Secrete_key,{expiresIn:'3h'});

            res.status(200).json(token);
    }
    catch(e){
        console.log(e);
    }
}