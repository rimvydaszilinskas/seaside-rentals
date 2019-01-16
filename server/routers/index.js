const router = require("express").Router();
const authorization = require("./authorization.js");
const properties = require("./properties");

module.exports = (config, passport) => {
    router.get("/", (req, res) => {
        
    });
    
    router.use("/auth", authorization(config, passport));
    router.use("/properties", properties(config));
    return router;
};