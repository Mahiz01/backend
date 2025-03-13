const mongoose  = require("mongoose");

const commentStructure = new mongoose.Schema({

    username:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    commentDate:{
        type:Date,
        default:Date.now

    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        require:true
    },
    
})

const Comments = mongoose.model("Comments",commentStructure);
module.exports = Comments;