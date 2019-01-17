const router = require("express").Router();
const Op = require("sequelize").Op;

module.exports = (config) => {
    var {filterAllAndCountGet, createProperty, getProperty} = require("../../services/PropertyServices")(config);
    var {CloudinaryUpload} = require("../../services/ImageServices")(config);

    let fileParser = config.fileParser;
    
    // directs to the search
    router.get("/", (req, res) => {
        res.render("search", {search: true, activeUser: req.user});
    });

    // returns appropriate view for the create request
    router.get("/create", (req, res) => {
        if(!req.isAuthenticated())
            res.render("properties/index");
        else 
            res.render("properties/create", {activeUser: req.user});
    });

    // returns anonymous create view
    router.get("/create/anonymous", (req, res) => {
        if(req.isAuthenticated)
            return res.render("properties/create", {activeUser: req.user});
        return res.render("properties/create");
    });

    // handles the basic information for the property and renders to image uploading view
    router.post("/create", (req, res) => {
        createProperty(req)
            .then(response => {
                return res.render("properties/upload", {property: response, activeUser: req.user});
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

        res.render("properties/upload", {property: property, activeUser: req.user});
    });

    // handles the uplaod request
    router.post("/upload", fileParser, (req, res) => {
        CloudinaryUpload(req)
            .then(response => {
                res.redirect(`/properties/get/${response[0].propertyId}`)
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
        var filters = {};
        filters.beds = req.query.beds;
        filters.rooms = req.query.rooms;
        filters.price = req.query.price;
        if(req.query.location !== "*")
            filters.location = req.query.location;
        if(req.query.type !== "*")
            filters.type = req.query.type;
        filterAllAndCountGet(req).then(result=> {
            // return res.json(result);
            return res.render("properties/results", {
                results: result, 
                search: true, 
                filters: filters, 
                resultSearch: true,
                activeUser: req.user
            });
        }).catch(err => {
            return res.send(err);
        });
    });

    router.get("/results", (req, res) => {
        res.render("properties/results", {activeUser: req.user});
    });
    return router;
};