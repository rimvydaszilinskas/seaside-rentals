const router = require("express").Router();
const authorization = require("./authorization.js");
const properties = require("./properties");
const api = require("./api");
const admin = require("./admin");

module.exports = (config, passport) => {
    var {getLatestProperties} = require("../services/PropertyServices")(config);
    var {getLatestInformation} = require("../services/InformationServices")(config);

    router.get("/", (req, res) => {
        getLatestInformation().then(information => {
            getLatestProperties()
            .then(response => {
                res.render("index", {
                    hasMap: true,
                    google_api_key: config.google.maps.api,
                    activeUser: req.user,
                    homeSearch: true,
                    properties: response,
                    user: req.user,
                    information: information
                });
            }).catch(err => {
                res.send(err);
            });
        });
    });
    
    router.use("/auth", authorization(config, passport));
    router.use("/properties", properties(config));
    router.use("/api", api(config));
    router.use("/admin", admin(config));
    return router;
};