const router = require("express").Router();
const Op = require("sequelize").Op;

module.exports = (config) => {
    var {filterAllAndCountGet, createProperty, getProperty} = require("../../services/PropertyServices")(config);
    var {CloudinaryUpload} = require("../../services/ImageServices")(config);

    let fileParser = config.fileParser;
    
    // directs to the search
    router.get("/", (req, res) => {
        res.render("search", {search: true});
    });

    // returns appropriate view for the create request
    router.get("/create", (req, res) => {
        if(!req.isAuthenticated())
            res.render("properties/index");
        else 
            res.render("properties/create", {user: req.user});
    });

    // returns anonymous create view
    router.get("/create/anonymous", (req, res) => {
        if(req.isAuthenticated)
            return res.render("properties/create", {user: req.user});
        return res.render("properties/create");
    });

    // handles the basic information for the property and renders to image uploading view
    router.post("/create", (req, res) => {
        createProperty(req)
            .then(response => {
                return res.render("properties/upload", { property: resp});
            }).catch(err => {
                console.log(err);
                res.json({err: err});
            });
    });

    router.get("/upload", (req, res) => {
        // TODO: should be accordingly to the edited
        let property = {
            city: "kaunas",
            address: "S. Zukausko 3",
            id: 1
        };

        res.render("properties/upload", {property: property});
    });

    // handles the uplaod request
    router.post("/upload", fileParser, (req, res) => {
        CloudinaryUpload(req)
            .then(response => {
                res.json(response);
            }).catch(err => {
                res.json({err: err});
            });
    });
    
    //display a specific property
    router.get("/get/:id", (req, res) => {
        var propertyId = req.param("id");

        getProperty(propertyId)
            .then((result) => {
                if(!result)
                    return res.json({message: "No item found!"});
                return res.render("properties/display", {property: result, hasMap: true, google_api_key: config.google.maps.api, activeUser: req.user});
            }).catch((err) => {
                res.send("Error");
            });
    });

    router.get("/search", (req, res) => {
        filterAllAndCountGet(req).then(result=> {
            return res.json(result);
        }).catch(err => {
            return res.send(err);
        });
    });

    router.get("/results", (req, res) => {
        res.render("properties/results");
    });
    return router;
};