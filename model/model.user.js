const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    }
},{timestamps:true});

const user = mongoose.model("user", userSchema);

module.exports = {user};