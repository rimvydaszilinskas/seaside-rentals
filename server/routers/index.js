const router = require("express").Router();
const authorization = require("./authorization.js");

module.exports = (config) => {
    router.get("/", (req, res) => {
        res.render("index");
    });
    
    router.use("/auth", authorization(config));

    return router;
};