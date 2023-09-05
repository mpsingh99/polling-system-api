const mongoose = require('mongoose');
const connectDB = async function(){
    try {
        await mongoose.connect('mongodb://127.0.0.1/db');
        console.log("Connected to the DB of Polling_Api");
    }catch (error) {
        console.log("Error in connecting to the database");
        return;
    }
}
connectDB();