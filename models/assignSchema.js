const { default: mongoose } = require("mongoose");

const assignStructure = new mongoose.Schema({
    employee :{
        type:mongoose.Schema.Types.ObjectId,
        required :true,
        ref:"Employee"
    },
    task :{
        type:mongoose.Schema.Types.ObjectId,
        required :true,
        ref:"Task"
    }
})

const Assign = mongoose.model("Assign",assignStructure);
module.exports= Assign;