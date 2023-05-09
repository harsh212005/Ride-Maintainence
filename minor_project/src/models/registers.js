const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        default:0
    }
   


})

userschema.pre("save",async function(next){
    if(this.isModified("password")){
        
        console.log(`the current password is ${this.password}`);
        this.password  = await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);

        this.confirmpassword = undefined;
    }
   
    next();
})
const Register = new mongoose.model("Register",userschema);
module.exports = Register;