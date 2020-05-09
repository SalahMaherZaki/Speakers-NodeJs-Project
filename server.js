//------------- Import Packages ------------------
let express = require("express");
let session = require("express-session");
const bodyParser = require('body-parser');
var flash = require('connect-flash');
let path = require("path");
let authenticationRouter = require("./Routers/authRouting");
let speakerRouter = require("./Routers/speakerRouting");
let eventRouter = require("./Routers/eventsRouting");
let adminRouter = require("./Routers/adminRouting")
let mongoose = require("mongoose");
let server = express();
//----------- Listening to port -----------------
server.listen(8082, () => { console.log("Server is Connected in port 8082 ..."); });
//------------ MiddleWare at First -----------------------
server.use(function (request, response, next) {
    console.log("This is First Middleware , URL : " + request.url + " And method : " + request.method);
    next();
})
//------------ Settings ---------------
server.use(express.urlencoded({ extended: false }));
server.use(session({ secret: 'Salah',cookie: { maxAge: 600000 }, saveUninitialized: true, resave: true }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set("view engine", "ejs", { __dirname: String });
server.set("views", path.join(__dirname, "views"))
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "node_modules")));
// server.use(flash());
//------------ Routers -----------------
server.use(express.json());
server.use(authenticationRouter);
server.use((request, response, next) => {
    if (request.session.role) {
        next();
    }
    else {
        response.redirect("/login");
    }
});
server.use("/speakers", speakerRouter);
server.use("/admin", adminRouter);
server.use("/events", eventRouter);
//------------ Middleware at End --------------


// server.get('/flash', function(req, res){
//     // Set a flash message by passing the key, followed by the value, to req.flash().
//     req.flash('info', 'Flash is back!')
//     res.redirect('/');
//   });

// server.get('/', function (req, res) {
//     // Get an array of flash messages by passing the key to req.flash()
//     res.render('index', { messages: req.flash('info') });
// });
//------------- DB Connection -------------------------
mongoose.connect('mongodb://localhost:27017/Events', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("DB is Connected ..."); })
    .catch((error) => { console.log(error + " "); })