const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cloudinary = require("cloudinary");
const fileParser = require("connect-multiparty")();

const app = express();

// get the configuration
const configs = require("./config")[app.get("env")];

// set up cloudinary account
cloudinary.config({
    cloud_name: configs.cloudinary.cloud_name,
    api_key: configs.cloudinary.api_key,
    api_secret: configs.cloudinary.api_secret
});

configs.cloudinary = cloudinary;
configs.fileParser = fileParser;

// Get database objects
const models = require("./models/sequelize.js")(app.get("env"), configs.database.sync);
configs.models = models;

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// set up static file serve
app.use(express.static("static"));

// set up passport
app.use(session({
    secret: configs.session.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// load passport configuration
require("./configuration/passport-config.js")(passport, models.User);

// set up routing
const routers = require("./routers");
app.use("/", routers(configs, passport));

app.listen(configs.app.port, (err) => {
    if(err)
        throw err;
    console.log(`Listening on port ${configs.app.port}`);
});