const router = require("express").Router();

module.exports = (config) => {
    let Property = config.models.Property;

    router.get("/create", (req, res) => {
        if(!req.isAuthenticated())
            res.render("properties/create");
        else 
            res.render("properties/create", {user: req.user});
    });

    router.post("/create", (req, res) => {
        if(req.isAuthenticated()){
            Property.create({
                address: req.body.address,
                city: req.body.city,
                price: req.body.price,
                propertyType: req.body.propertyType,
                userId: req.user.id
            }).then((resp) => {
                console.log(resp.get());
                res.json(resp.get());
            });
        } else {
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
                res.json(resp.get());
            });
        }
    });

    return router;
};