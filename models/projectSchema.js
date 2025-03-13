const { default: mongoose } = require("mongoose");

const projectStructure = new mongoose.Schema({
    title:{
        type:String,
        requied:true
    }
    ,
    shortDescription:{
        type:String,
        require:true
    },
    startDate:{
        type: Date,
        default:Date.now
    },
    estimatedEndDate:{
        type:Date,
        default:Date.now
    },
    clientName: {type: String  },
    techStack: {type: String  },
})

const Project = mongoose.model("Project",projectStructure);
module.exports= Project;