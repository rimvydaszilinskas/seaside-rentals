const router = require("express").Router();

module.exports = (config) => {
    router.get("/login", (req, res) => {
        // return a login view
    });

    router.post("/login", (req, res) => {
        // check the validity of the data
            // set session data
            // redirect back to home page
    });

    router.get("/register", (req, res) => {
        // return a register view
    });

    router.post("/register", (req, res) => {
        // check the validity of the data
            // add to database
                // redirect back home
    });
    return router;
};