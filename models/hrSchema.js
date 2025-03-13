const { default: mongoose } = require("mongoose");

const hrStructure = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"ROLE_ADMIN"
    }
})
const Hr = mongoose.model("Hr",hrStructure)
module.exports= Hr;