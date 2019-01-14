const express = require("express");
const config = require("./config");
const app = express();
const bodyParser = require("body-parser");

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up view engine
app.use("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// set up static file serve
app.use(express.static("static"));

// get the configuration
const configs = config[app.get("env")];

// set up middleware

// set up routing
const routers = require("./routers");
app.use("/", routers);

app.listen(configs.port, (err) => {
    if(err)
        throw err;
    console.log(`Listening on port ${configs.port}`);
});