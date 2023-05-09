const mongoose = require("mongoose");
const ratingform1 = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
   
    rating:{
        type:Number,
        required:true
        
    },
    message:{
        type:String,
        required:true
    },
    is_value:{
        type:Number,
        default:0
    }
   


})
const Review = new mongoose.model("Review",ratingform1);
module.exports = Review;