const mongoose = require("mongoose");
//---------- Define Schema for Speaker ----------
let speakerSchema = new mongoose.Schema({
    _id:Number,
    userName:String,
    userPassword:String,
    address:{
        city:String,
        street:Number,
        building:Number
    }
})
//---------- Mapping Speaker schema ---------
mongoose.model("speakers",speakerSchema);
 