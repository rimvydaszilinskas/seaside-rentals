const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

router.get("/login", (req, res) => {

});
module.exports = router;