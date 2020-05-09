const express = require("express");
const eventRouter = express.Router();
const mongoose = require("mongoose");
require("./../Models/eventModel");
eventModel = mongoose.model("events");
speakerModel = mongoose.model("speakers");
//-------------- List Events --------------------
eventRouter.get("/list", (request, response) => {
    eventModel.find({}).populate("mainSpeaker otherSpeakers")
        .then((data) => {
            response.render("events/eventList", { event: data });
        })
        .catch((error) => { console.log(error) })
});
//-------------- Add Event (get) --------------
eventRouter.get("/add", (request, response) => {
    eventModel.find({}).populate({ path: "mainSpeaker otherSpeakers" })
        .then((eventData) => {
            speakerModel.find({})
                .then((speakerData) => {
                    response.render("events/eventAdd", { speaker: speakerData });
                })
                .catch((error) => { console.log(error) })
        })
        .catch((error) => { console.log(error) })
});
//-------------- Add Event (post) --------------
eventRouter.post("/add", (request, response) => {
    let newEvent = new eventModel(request.body)
    newEvent.save()
        .then((data) => { response.redirect("/events/eventList", { event: data }); })
        .catch((error) => { console.log(error + " "); })
});
//-------------- Update Event (get) -------------
eventRouter.get("/update/:_id", (request, response) => {
    eventModel.findOne({ _id: request.params._id })
        .then((data) => {
            speakerModel.find({})
                .then((speakerData) => {
                    response.render("events/eventUpdate", { speaker: speakerData });
                })
                .catch((error) => { console.log(error) })
        })
});
//-------------- Update Event (post) -------------
eventRouter.post("/update", (request, response) => {
    eventModel.updateOne({ _id: request.body._id }, { $set: request.body })
        // eventModel.findByIdAndUpdate(request.body._id,request.body) //---- Another Solution --
        .then((data) => { response.redirect("/events/list"); })
        .catch((error) => { console.log(error + " "); })
})
//------------- Delete Event (get) -------------------
eventRouter.get("/delete/:_id", (request, response) => {
    eventModel.deleteOne({ _id: request.params._id })
        .then((data) => { response.redirect("/events/list") })
        .catch((error) => { console.log(error + " "); })
});



module.exports = eventRouter;