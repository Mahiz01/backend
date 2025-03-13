const Assign = require("../models/assignSchema");
const Employee = require("../models/employeeSchema");
const Hr = require("../models/hrSchema");
const Task = require("../models/taskSchema");

exports.workAddAssign = async(req,res)=>{
    try{
        let u = req.user;
                console.log(u.username)
                const hr = await Hr.findOne({username:u.username})
                if(!hr){
                    return res.status(400).json("Invalid Authorization");
                }
        const {eid,tid}=req.body;
        let emp = await Employee.findById(eid);
        console.log(emp);
        if(!emp){
            return res.status(500).json("invalid emp");
        }
        let task = await Task.findById(tid);
        if(!task){
            return res.status(500).json("invalid task");
        }

        const assign = new Assign({employee:emp._id,task:task._id});
        await assign.save();
        return res.status(200).json(assign);
    }
    catch(e){
        console.log(e);
    }
}

exports.getAssigns = async(req,res)=>{
    try{
        let u = req.user;
        console.log(u.username)
        const hr = await Hr.findOne({username:u.username})
        if(!hr){
            return res.status(400).json("Invalid Authorization");
        }
        const assigns = await Assign.find().populate('employee').populate('task')
        //  .populate({
        //     path: 'project',
        //     // Get friends of friends - populate the 'friends' array for every friend
        //     populate: { path: 'task' }
        //   });; --- for relative populate();
        if(!assigns){
            return res.status(400).json("No Assigns Still");
        }
        // const derivedAssigns = assigns.populate('project');
        res.status(200).json(assigns);
        // console.log(derivedAssigns);

    }
    catch(e){
        console.log(e);
    }
}