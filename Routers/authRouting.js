const express = require("express");
mongoose = require("mongoose");
let path = require("path");
const authenticationRouter = express.Router();
require("../Models/speakerModel");
let speakerModels = mongoose.model("speakers");
//------------ Login (get) --------------
authenticationRouter.get("/login", function (request, response) {
    // response.sendFile(path.join(__dirname,"..","UserViews","login"));
    response.render("auth/login");
})
//------------- login (post) ---------------
authenticationRouter.post("/login", (request, response ,next) => {
    speakerModels.findOne({ userName: request.body.name })
        .then((data) => {
            if(data){
            // if (request.body.name == data.userName && request.body.password == data.userPassword) {
                
                request.session.name = data.name;
                // request.session.city = request.session.city;
                // request.session.street = request.session.street;
                // request.session.building = request.session.building;
                response.locals.name = request.session.name;
                request.session.role = "speaker";
                // response.locals.city = request.session.city;
                // response.locals.street = request.session.street;
                // response.locals.building = request.session.building;
                response.redirect("/speakers/List");
                next();
            }
            else if (request.body.name == "Eman" && request.body.password == "123") {
                request.session.role = "admin";
                request.session.name = "Eman";
                response.locals.adminName = request.session.name;
                response.redirect("/admin/profile");
                next();
            }
            else {
                response.redirect("/login");
            }

        })
        .catch((error) => {
            console.log(error + " ")
        })


});
//----------- Register (get) ---------------
authenticationRouter.get("/register", (request, response) => {
    response.render("auth/register");
});
//----------- Register (post) ---------------
authenticationRouter.post("/register", (request, response) => {
    speakerModels.findOne({ userName: request.body.userName })
        .then((data) => {
            if (data == null) {
                let newSpeaker = new speakerModel(request.body)
                newSpeaker.save()
                    .then((data) => {
                        response.redirect("login");
                    })
                    .catch((error) => {
                        console.log(error + " ");
                    })
            }
            else {
                response.send("This UserName exists before , Try unique and new userName...");
            }
        })
        .catch((error) => {
            console.log(error);
        })
})
//------------ Logout ---------------------
authenticationRouter.get("/logout", (request, response) => {
    request.session.destroy(() => {
        response.redirect("/login")
    });
})

module.exports = authenticationRouter;