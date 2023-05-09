const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/rideMaintenance",{
    useNewurlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true

}).then(()=>{
    console.log(`connection database`);
}).catch((e)=>{
    console.log(`connection succesfil`);
})