const express = require("express");
const speakerRouter = express.Router();
const mongoose = require("mongoose");
require("./../Models/speakerModel");
speakerModel = mongoose.model("speakers");
//------------ List Speakers -----------------------
speakerRouter.get("/list", (request, response) => {
    speakerModel = mongoose.model("speakers");
    speakerModel.find({})
        .then((data) => {
            response.locals.name = request.session.name;
            response.render("auth/speakersList", { speaker: data });
        })
        .catch((error) => {
            response.send(error + " ");
        })
});
//------------ Update Speaker (get) --------------------
speakerRouter.get("/update/:_id", (request, response) => {
    speakerModel.findOne({ _id: request.params._id })
        .then((data) => {
            response.render("auth/speakerUpdate", { speaker: data });
        })
});
//------------ Update Speaker (post) --------------------
speakerRouter.post("/update", (request, response) => {
    speakerModel.updateOne({ _id: request.body._id }, { $set: request.body })
        .then((data) => {
            response.redirect("/speakers/list");
        })
        .catch((error) => {
            console.log(error)
        })
});
//------------ Delete Speaker (get) ---------------------
speakerRouter.get("/delete/:_id", (request, response) => {
    speakerModel.deleteOne({ _id: request.params._id })
        .then((data) => { response.redirect("/speakers/list") })
        .catch((error) => { console.log(error + " ") })
});




module.exports = speakerRouter;