const router = require("express").Router();
const authorization = require("./authorization.js");

module.exports = (config, passport) => {
    router.get("/", (req, res) => {
        res.render("index", {google_api_key: config.google.maps.api});
    });
    
    router.use("/auth", authorization(config, passport));

    return router;
};