const mongoose = require('mongoose');
mongoose.set("strictQuery", true)

mongoose.connect("mongodb://localhost:27017/server").
then(()=>{
    console.log("Database Connected!")
    console.log("=========================================================================");
}).catch((err)=>{
    console.log("Database Not Connected!")
})
