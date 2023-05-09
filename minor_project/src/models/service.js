const mongoose = require("mongoose");
const serviceform1 = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
   
    phone:{
        type:Number,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        
    },
    address: {
        type:String,
        required:true
    },
    servicename:{
        type:String,
        required:true
    },
    dealername:{
        type:String,
        // required:true
        
    },

    is_value:{
        type:Number,
        default:0
    }
   


},
{
    timestamps:true
})
const Service = new mongoose.model("Service",serviceform1);
module.exports = Service;
