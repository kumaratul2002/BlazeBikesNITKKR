// const mongoose = require("mongoose");

// function connectDB(){

//     mongoose.connect('mongodb+srv://doodleforstudy:QfE5FfuxLtSsgrNG@cluster0.oddr9ue.mongodb.net/Easy-Ride' , {useUnifiedTopology: true , useNewUrlParser: true})

//     const connection = mongoose.connection

//     connection.on('connected' , ()=>{
//         console.log('Mongo DB Connection Successfull')
//     })

//     connection.on('error' , ()=>{
//         console.log('Mongo DB Connection Error')
//     })

//     // QfE5FfuxLtSsgrNG
// }

// connectDB()

// module.exports = mongoose

const mongoose = require("mongoose");

exports.connect = () => {
    mongoose.connect("mongodb+srv://doodleforstudy:QfE5FfuxLtSsgrNG@cluster0.oddr9ue.mongodb.net/Easy-Ride", {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};