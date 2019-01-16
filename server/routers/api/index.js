const router = require("express").Router();

module.exports = (config) => {
    var {filterAllAndCountPost} = require("../../services/PropertyServices")(config);

    router.post("/filter/count", (req, res) => {
        filterAllAndCountPost(req)
            .then(response => {
                res.json(response.count);
            }).catch(err => {
                res.json({err: err});
            }) 
    });

    router.post("/filter", (req, res) => {
        filterAllAndCountPost(req)
            .then(response => {
                res.json(response);
            }).catch(err => {
                res.json({err: err});
            });
    });
    return router;
};