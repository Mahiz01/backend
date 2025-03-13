const Employee = require("../models/employeeSchema");
const Hr = require("../models/hrSchema");
const Project = require("../models/projectSchema");
const Task = require("../models/taskSchema");

exports.addTask = async(req,res) =>{
    try{
            // const id = req.params.id;
            // const project = await Project.findById(id);
            // if(!project){
            //     return res.status(404).json("Invalid Id");
            // }
            const{title, shortDescription, estimatedEndDate,project} = req.body;
            console.log()
            const task = new Task({title, shortDescription, estimatedEndDate,"project":project});
            await task.save();
            res.status(200).json(task);
    }
    catch(e){
        console.log(e);
    }
}

exports.getAllTask = async(req,res) =>{
    try{
        let u = req.user;
                console.log(u.username)
                const hr = await Hr.findOne({username:u.username})
                const employee = await Employee.findOne({username:u.username})

                if(!hr && !employee){
                    return res.status(400).json("Invalid Authorization ");
                }
                
const task = await Task.find().populate("project");
res.status(200).json(task);
    }
    catch(e){
        console.log(e);
    }
}

exports.getTaskById = async(req,res)=>{
    try{
        // let u = req.user;
        // console.log(u.username)
        // const hr = await Hr.findOne({username:u.username})
        // const employee = await Employee.findOne({username:u.username})

        // if(!hr && !employee){
        //     return res.status(400).json("Invalid Authorization ");
        // }
        let id = req.body;
        console.log(id)
        const task = await Task.findOne({_id:id.tid}).populate("project");
        console.log(task);
        res.status(200).json(task);
    }
    catch(e){
console.log(e);
    }

}