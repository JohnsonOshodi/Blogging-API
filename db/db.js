//Import mongoose 
const mongoose = require('mongoose');


//Import config file
const CONFIG = require("./../config/config");

//Database connection function
async function connectToDB() { 

    try{
const DB =process.env.MONGODB_URI
        await mongoose.connect(DB);

        
            console.log("Connected to the DB")
      } 
    catch(err){
        console.log(err)
    }}
    

//Export database connection function
module.exports = connectToDB;