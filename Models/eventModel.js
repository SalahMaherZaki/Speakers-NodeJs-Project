const mongoose = require("mongoose");
//---------- Define Schema for Event ----------
let eventSchema = new mongoose.Schema({
    _id:Number,
    title:String,
    mainSpeaker:{type:Number,ref:"speakers"},
    otherSpeakers:[{type:Number,ref:"speakers"}]
})
//-------------- Mapping Event schema --------------
mongoose.model("events",eventSchema);