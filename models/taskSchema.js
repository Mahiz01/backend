const mongoose = require("mongoose");

const taskStructure = new mongoose.Schema({
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
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    status:{
        type:String,
        default:"active"
    }
})

const Task = mongoose.model("Task",taskStructure);
module.exports= Task;