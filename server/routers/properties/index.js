const router = require("express").Router();

module.exports = (config) => {
    let Property = config.models.Property;
    let User = config.models.User;
    let Image = config.models.Image;
    let cloudinary = config.cloudinary;
    let fileParser = config.fileParser;
    
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
        // check if user is authenticated, if so just simply get the id data from the session
        if(req.isAuthenticated()){
            Property.create({
                address: req.body.address,
                city: req.body.city,
                price: req.body.price,
                propertyType: req.body.propertyType,
                roomcount: req.body.roomCount,
                description: req.body.description,
                userId: req.user.id
            }).then((resp) => {
                return res.render('properties/upload', { property: resp.get()});
            });
        } else {
            //if user is not authorized and chose to make an anonymous ad, the user is created without a password, therefore cannot be authorized
            Property.create({
                address: req.body.address,
                city: req.body.city,
                price: req.body.price,
                propertyType: req.body.propertyType,
                roomcount: req.body.roomCount,
                description: req.body.description,
                user: {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone
                }
            }, {include: [config.models.relations.PropertyUser]}).then((resp) => {
                return res.render("properties/upload", { property: resp.get()});
            });
        }
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
        // get all the image keys
        var imageKeys = Object.keys(req.files);
        var files = req.files;
        var propertyId = req.body.propertyId;
        console.log(propertyId);
        var promises = [];

        // check if the correct request was made
        if(imageKeys.length === 0){
            return res.json({message: "No files uplaoded"});
        }

        // loop through each image
        imageKeys.forEach(key => {
            // check if the image is of valid sizze
            if(files[key].size > 0) {
                // push a new promise to the promise array
                promises.push(new Promise((resolve, reject) => {
                    // define uploading 
                    cloudinary.uploader.upload(files[key].path, (result) => {
                        if(result.url){
                            Image.create({
                                url: result.url,
                                propertyId: propertyId
                            }).then((result) => {
                                // resolve the promise if success
                                resolve(result.get());
                            }).catch((err) => {
                                // reject the promise if error
                                reject(err);
                            });
                        } else {
                            // reject the promise if result does not respond with url
                            reject(err);
                        }
                    })
                }));
            }
        }); // end foreach

        // execute the promises created
        Promise.all(promises).then((obj) => {
            res.json(obj);
        }).catch((err) => {
            res.send(err);
        });
    });

    router.get("/get/:id", (req, res) => {
        var propertyId = req.param("id");

        Property.findOne({
            where: {
                id: propertyId,
            },
            include: [{model: User, as: "user"}, {model: Image, as: "images"}]
        }).then((result) => {
            result.getDate(result.createdAt);
            // return res.json(result);
            return res.render("properties/display", {property: result, hasMap: true, google_api_key: config.google.maps.api, activeUser: req.user});
        }).catch((err) => {
            console.log(err);
            res.send("Error");
        });
    });

    return router;
};