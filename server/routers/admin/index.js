const router = require("express").Router();

function isAdmin(req, res, next) {
    return next();
    if(req.isAuthenticated()){
        if(req.user.admin === true)
            return next();
    }
    res.redirect("/auth/login");
}

module.exports = (config) => {
    const {getAllProperties, deleteProperty, getProperty, updateProperty} = require("../../services/PropertyServices.js")(config);
    const {getUser, getAllUsers, deleteUser, updateUser} = require("../../services/UserServices.js")(config);

    router.get("/", isAdmin, (req, res) => {
        getAllProperties().then(result => {
            res.render("admin/index", {properties: result});
        }).catch(err => {
            res.send(err);
        })
    });

    router.post("/property/delete", isAdmin, (req, res) => {        
        deleteProperty(req.body.id).then(result => {
            res.json({id: result});
        }).catch(err => {
            res.status(500).json({err: err});
        })
    });

    router.get("/property/edit/:id", isAdmin, (req, res) => {
        getProperty(req.params.id).then(response => {
            res.render("admin/edit", {item: response});
        }).catch(err => {
            res.status(500).json({error: err})
        });
    });

    router.post("/property/update", isAdmin, (req, res) => {
        var id = req.body.id;
        var query = req.body.query;
        updateProperty(id, query).then(response => {
            res.send(response);
        }).catch(err => {
            res.status(500).json({error: err});
        });
    });

    router.get("/users", isAdmin, (req, res) => {
        getAllUsers().then(response => {
            res.render("admin/users", {users: response});
        }).catch(err => {
            res.status(500).json({error: err});
        })
    });

    router.get("/users/edit/:id", isAdmin, (req, res) => {
        var id = req.params.id;
        getUser(id).then(response => {
            res.render("admin/editUser", {user: response});
        }).catch(err => {
            res.status(500).json({error: err});
        });
    });

    router.post("/users/delete", isAdmin, (req, res) => {
        var id = req.body.id;
        deleteUser(id).then(respose => {
            res.json(response);
        }).catch(err => {
            res.json({error: err});
        })
    });

    router.post("/users/update", isAdmin, (req, res) => {
        var id = req.body.id;
        var query = req.body.query;

        updateUser(id, query).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json({err: err})
        });
        
    });

    return router;
};