const router = require("express").Router();
const authorization = require("./authorization.js");

module.exports = (config, passport) => {
    router.get("/", (req, res) => {
        res.render("index");
    });
    
    router.use("/auth", authorization(config));

    return router;
};