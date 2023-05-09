const express  = require("express");
const path  = require("path");
const app = express();
const hbs = require("hbs");
const bodyparser = require("body-parser");
const bcrypt  = require("bcryptjs");
const session = require("express-session");
const Register = require("./models/registers")
const config = require("../config/config");

// app.use(session({secret:config.sessionSecret}));
const auth = require("../middleware/auth");
const Service = require("./models/service");
const Review = require("./models/rating");
require("./db/conn");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(express.static(static_path));

app.set("view engine","ejs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index1",{name:""});
})

app.get("/logout",(req,res)=>{
    res.render("index1",{name:""})
})

// app.get("/index1",(req,res)=>{
//     res.render("index1",{name1});
// });

app.get("/serviceform",(req,res)=>{
    res.render("serviceform");
})

app.get("/review",async(req,res)=>{
    const reviewdata = await Review.find({is_value:0});
    res.render("Rating",{rating:reviewdata});
})


app.post("/review",async(req,res)=>{
    try{
       
        const reviewform  = new Review({
         name: req.body.username ,
         rating:req.body.rating,
         message:req.body.Message,
         
        
        })
      
        const reviewdata = await Review.find({is_value:0});
 
        const reviewed = await reviewform.save();
 
        res.status(201).render("Rating",{rating:reviewdata});
     }catch(error){
         res.status(400).send(error);
     }
})

app.post("/serviceform", async(req,res)=>{
       
      
    try{
       
       const serviceform  = new Service({
        name: req.body.username ,
        phone:req.body.mobile,
        email:req.body.email,
        address:req.body.address,
        servicename:req.body.service,
        dealername:req.body.dealers
       
       })
       console.log(req.body.dealers)
       

       const serviced = await serviceform.save();

       res.status(201).render("index1",{name:""});
    }catch(error){
        res.status(400).send(error);
    }

})

app.get("/register",(req,res)=>{
    res.render("signup",{message:" "});
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/admin",(req,res)=>{
    res.render("admin");
})

app.get("/reviews",(req,res)=>{
    res.render("Rating");
})

app.post("/register", async(req,res)=>{
    try{
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        password=req.body.password;
        cpassword=req.body.confirmPassword;
        
        if(password === cpassword){
           const registeruser = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phoneNumber,
            password:req.body.password,
            confirmpassword:req.body.confirmPassword,
            
           }) 

          const registered = await registeruser.save();
          res.status(201).render("signup",{
            message:"succesfully sign up",
          });
        }
        else{
            res.send("password are not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password  = req.body.password;

        const useremail = await Register.findOne({email:email});
        const usedata = await Register.find({is_admin:0});
        const servicedata = await Service.find({is_value:0});
        const ismatch = await bcrypt.compare(password,useremail.password);
        if(ismatch){
            
            // res.status(201).redirect("/"
            // )
            // res.redirect("/")
            
            if(useremail.is_admin === 1){
                res.status(201).render("admin",{user:usedata,servece:servicedata});

            }
            else{
                // req.session.user_id = useremail._id;
                name1 = useremail.firstname;
                res.status(201).render("index1",{name:useremail});
                // res.redirect("/index1");
                
            }
            
        }
        else{
            res.send("invalid login detail");
        }
        
    }catch(error){
        res.status(400).send("Invalid login details");
    }
})




// const securePassword = async (password) =>{
//     const passwordHash = await bcrypt.hash(password,10);
//     console.log(passwordHash);

//     const passwordmatch = await bcrypt.compare(password,passwordHash);
//     console.log(passwordmatch);
// }
// securePassword("harsh@123");


app.listen(port,()=>{
    console.log("server connection sucessful");
});
