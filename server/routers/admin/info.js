const router = require("express").Router();

module.exports = (config) => {
    const {getInformation, getAllInformation, updateInformation, deleteInformation, addInformation, getLatestInformation} = require("../../services/InformationServices")(config);
    var isAdmin = config.isAdmin;

    router.get("/", isAdmin, (req, res) => {
        getAllInformation().then(response => {
            console.log(response.length);
            res.render("admin/info/index", {informations: response});
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    });

    router.get("/edit/:id", isAdmin, (req, res) => {
        getInformation(req.params.id).then(response => {
            res.render("admin/info/edit", {information: response});
        });
    });

    router.post("/update", isAdmin, (req, res) => {
        updateInformation(req.body.id, req.body.query).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json({error: err});
        });
    });

    router.post("/delete", isAdmin, (req, res) => {
        if(req.body.id){
            deleteInformation(req.body.id).then(response => {
                res.json(response);
            }).catch(err => { 
                res.status(500).json({error: err});
            })
        } else {
            res.status(500).json({error: "Bad request"});
        }
    });

    router.get("/create", isAdmin, (req, res) => {
        res.render("admin/info/add");
    });

    router.post("/create", isAdmin, (req, res) => {
        addInformation(req.body).then(response => {
            res.redirect(`/admin/info/edit/${response.id}`);
        }).catch(err => {
            res.status(500).json({error: err});
        })
    });

    return router;
}