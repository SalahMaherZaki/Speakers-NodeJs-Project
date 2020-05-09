const express = require("express");
const adminRouter = express.Router();
const mongoose = require("mongoose");
require("./../Models/adminModel");
adminModel = mongoose.model("admin");

//-------- Signup as an admin (get) ------------
adminRouter.get("/signup", (request, response) => {
    response.send("SignUp as an Admin");
})
//-------- Signup as an admin (post) ------------
adminRouter.post("/signup", (request, response) => {
    let admin = new adminModel(request.body)
    admin.save()
        .then((data) => { response.send(data); })
        .catch((error) => { console.log(error + " "); })
})
adminRouter.get("/profile", (request, response) => {
    response.locals.adminName = "Eman";
    response.render("../views/profiles/adminProfile")
});



module.exports = adminRouter;