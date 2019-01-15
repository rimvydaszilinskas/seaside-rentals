const router = require("express").Router();

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect("/auth/login");
}

module.exports = (config, passport) => {
    router.get("/login", (req, res) => {
        // return a login view
        res.render("login");
    });

    router.post("/login", passport.authenticate('local-login', {
        successRedirect: "/auth/testaccess",
        failureRedirect: "/auth/login"
    }));

    router.get("/register", (req, res) => {
        // return a register view
        res.render("register");
    });

    router.post("/register", passport.authenticate("local-signup", {
        successRedirect: "/auth/testaccess",
        failureRedirect: "/auth/register"
    }));

    router.get("/logout", (req, res) => {
        req.session.destroy();
        res.send("logged out");
    });

    router.get("/testaccess", isLoggedIn, (req, res) => {
        res.send("authenticated");
    });

    return router;
};