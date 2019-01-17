const router = require("express").Router();

module.exports = (config) => {
    var {filterAllAndCountPost, getLaterThan} = require("../../services/PropertyServices")(config);

    router.post("/filter/count", (req, res) => {
        filterAllAndCountPost(req)
            .then(response => {
                res.json(response.count);
            }).catch(err => {
                res.status(500).json({err: err});
            }) 
    });

    router.post("/filter", (req, res) => {
        filterAllAndCountPost(req)
            .then(response => {
                res.json(response);
            }).catch(err => {
                res.status(500).json({err: err});
            });
    });

    router.post("/filter/later", (req, res) => {
        // responds with properties later than a specified id
        getLaterThan(req)
            .then(result => {
                res.json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
    });
    return router;
};