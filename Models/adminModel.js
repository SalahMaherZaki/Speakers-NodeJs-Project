const mongoose = require("mongoose");
//---------- Define Schema for Admin ----------
let adminSchema = new mongoose.Schema({
    _id: Number,
    adminName: {type:String,required:true},
    adminPassword: {type:String,required:true}
})
//---------- Mapping Admin schema ---------
mongoose.model("admin", adminSchema);

