const express = require("express");
const session = require("express-session");
const config = require("./config");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const path = require("path");

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// set up static file serve
app.use(express.static("static"));

// get the configuration
const configs = config[app.get("env")];

app.set("webTitle", configs.app.title);

// set up middleware
app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: configs.secret,
    resave: false,
    saveUninitialized: true
}));
console.log(app.locals.settings.webTitle);
// set up routing
const routers = require("./routers");
app.use("/", routers(config));

app.listen(configs.port, (err) => {
    if(err)
        throw err;
    console.log(`Listening on port ${configs.port}`);
});