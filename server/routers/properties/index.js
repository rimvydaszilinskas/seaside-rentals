const router = require("express").Router();

module.exports = (config) => {
    let Property = config.models.Property;
    let Image = config.models.Image;
    let cloudinary = config.cloudinary;
    let fileParser = config.fileParser;
    
    router.get("/create", (req, res) => {
        if(!req.isAuthenticated())
            res.render("properties/create");
        else 
            res.render("properties/create", {user: req.user});
    });

    router.post("/create", (req, res) => {
        // check if user is authenticated, if so just simply get the id data from the session
        if(req.isAuthenticated()){
            Property.create({
                address: req.body.address,
                city: req.body.city,
                price: req.body.price,
                propertyType: req.body.propertyType,
                userId: req.user.id
            }).then((resp) => {
                let property = resp.get();
                console.log(property);
                res.json(resp.get());
            });
        } else {
            //if user is not authorized and chose to make an anonymous ad, the user is created without a password, therefore cannot be authorized
            Property.create({
                address: req.body.address,
                city: req.body.city,
                price: req.body.price,
                propertyType: req.body.propertyType,
                user: {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone
                }
            }, {include: [config.models.relations.PropertyUser]}).then((resp) => {
                let property = resp.get();
                console.log(property);
                res.json(property);
            });
        }
    });

    router.get("/upload", (req, res) => {
        let property = {
            city: "kaunas",
            address: "S. Zukausko 3",
            id: 1
        };

        res.render("properties/upload", {property: property});
    });

    router.post("/upload", fileParser, (req, res) => {
        // get all the image keys
        var imageKeys = Object.keys(req.files);
        var files = req.files;
        var propertyId = req.body.propertyId;
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

    return router;
};