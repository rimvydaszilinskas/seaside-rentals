const express = require("express");
const session = require("express-session");
const config = require("./config");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

// get the configuration
var configs = config[app.get("env")];

// Get database objects
const models = require("./models/sequelize.js");

if(app.get("env") === "development")
    models.sequelize.sync().then(() => console.log("Models synchronized"));

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
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// load passport configuration file
require("./configuration/passport-config.js")(passport, models.User, models.Admin);

// set up routing
const routers = require("./routers");
app.use("/", routers(configs, passport));

app.listen(configs.port, (err) => {
    if(err)
        throw err;
    console.log(`Listening on port ${configs.port}`);
});