const mongoose = require('mongoose');

// const mongoURL = "mongodb://127.0.0.1:27017/demo-crud"

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})