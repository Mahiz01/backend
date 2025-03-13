const Comments = require("../models/commentSchema");
const Employee = require("../models/employeeSchema");
const Task = require("../models/taskSchema");

exports.addComment = async(req,res)=>{
    try{
        let object = req.user
        let username = object.username
        const emp = await Employee.findOne({username:username});
        if(!emp){
            return res.status(400).json("Login First");
        }
        const {message,task} = req.body;
        const comment = new Comments({"username":emp.username,message,task});
        await comment.save();
        

        res.status(200).json(comment);
    }
    catch(e){
        console.log(e);
    }
}


exports.getCommentsBytaskId = async(req,res)=>{
    try{
            let tid = req.params.id;
            const comment = await Comments.findOne({task:tid});
            if(!comment){
                return res.status(400).json("Pass the valid task Id");
            }
            return res.status(200).json(comment);
    }
    catch(e){
        console.log(e);
    }
}