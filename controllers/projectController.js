const Hr = require("../models/hrSchema");
const Project = require("../models/projectSchema");

exports.addProject = async(req,res) =>{
    try{
        const user = req.user;
        const hr = await Hr.findOne({username:user.username});
        console.log(user)
        if(!hr){
            return res.status(404).json("Invalid Credentials 1");
        }
        const{ title,shortDescription,estimatedEndDate,clientName,techStack}= req.body;

        const project = new Project({title,shortDescription,estimatedEndDate,clientName,techStack})
        await project.save();
        res.status(200).json(project);
    } 
    catch(e){
        console.log(e);
    }
}
exports.getAllProject = async(req,res) =>{
    try{
        let {page,size}= req.query;
        page = page||1;
        size = size||2;

        const skip = (page-1)*size;

       
        const projects = await Project.find().skip(skip).limit(size);
const totalRecords = await Project.countDocuments();
const totalPages = Math.ceil(totalRecords/size)
        res.status(200).json({
            'totalRecords':totalRecords ,
            'cuurentPage':page,
            'data':projects,
            'totalPages':totalPages
        });
    } 
    catch(e){
        console.log(e);
    }
}


exports.getAllProjectForFrontend  = async(req,res)=>{
    try{
            const data = await Project.find();
            res.status(200).json(data);
    }
    catch(e){
        console.log(e);
    }
}