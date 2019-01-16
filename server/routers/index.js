const router = require("express").Router();
const authorization = require("./authorization.js");
const properties = require("./properties");

module.exports = (config, passport) => {
    router.get("/", (req, res) => {
        res.render("index", {hasMap: true, google_api_key: config.google.maps.api, activeUser: req.user})
    });
    
    router.use("/auth", authorization(config, passport));
    router.use("/properties", properties(config));
    return router;
};