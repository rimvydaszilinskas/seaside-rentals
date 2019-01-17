const Op = require("sequelize").Op;

module.exports = (config) => {
    let Property = config.models.Property;
    let User = config.models.User;
    let Image = config.models.Image;

    function createProperty(req) {
        return new Promise(resolve => {
            // check if user is authenticated, if so just simply get the id data from the session
            if(req.isAuthenticated()){
                Property.create({
                    address: req.body.address,
                    city: req.body.city,
                    price: req.body.price,
                    propertyType: req.body.propertyType,
                    roomcount: req.body.roomCount,
                    bedcount: req.body.bedCount,
                    description: req.body.description,
                    userId: req.user.id
                }).then((res) => {
                    return resolve(res.get());
                }).catch(err => {
                    throw Error(err);
                });
            } else {
                //if user is not authorized and chose to make an anonymous ad, the user is created without a password, therefore cannot be authorized
                Property.create({
                    address: req.body.address,
                    city: req.body.city,
                    price: req.body.price,
                    propertyType: req.body.propertyType,
                    roomcount: req.body.roomCount,
                    bedcount: req.body.bedCount,
                    description: req.body.description,
                    user: {
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phone: req.body.phone
                    }
                }, {include: [config.models.relations.PropertyUser]}).then((res) => {
                    return resolve(res.get());
                }).catch(err => {
                    throw Error(err);
                });
            }
        });
    }

    function filterAllAndCountGet(req) {
        // gets the data types of type, location, room, bed, price
        // prepare filters for type and location
        // default select all operators will be marked as *
        var propertyTypeFilter;
        var locationFilter;

        // set location filters
        if(req.query.location) {
            if(req.query.location !== "*"){
                locationFilter = {
                    [Op.eq]: req.query.location
                };
            } else {
                locationFilter = {
                    [Op.not]: null
                };
            }
        }

        // set location type filters
        if(req.query.type) {
            if(req.query.type !== "*"){
                propertyTypeFilter = {
                    [Op.eq]: req.query.type
                };
            } else {
                propertyTypeFilter = {
                    [Op.not]: null
                };
            }
        }
        return new Promise(resolve => {
            Property.findAndCountAll({
                where: {
                    $and: [
                        {
                            $or: [
                                {
                                    price: {
                                        [Op.lte] : req.query.price
                                    },
                                },
                                {
                                    price: {
                                        [Op.eq] : null
                                    }
                                }
            
                            ],
                        },
                        {
                            $or: [
                                {
                                    bedCount: {
                                        [Op.gte] : req.query.beds
                                    },
                                },
                                {
                                    bedCount: {
                                        [Op.eq] : null
                                    }
                                },
                                {
                                    bedCount: {
                                        [Op.eq] : 0
                                    }
                                }
                            ]
                        }
                    ],
                    propertyType: propertyTypeFilter,
                    city: locationFilter
                }, include: [
                    {model: User, as: "user"},
                    {model: Image, as: "images"}
                ],
                order: [
                    ['id', 'desc']
                ]
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                throw err;
            });
        });   
    }

    function filterAllAndCountPost(req) {
        //prepare filters
        var propertyTypeFilter;
        var locationFilter;
        if(req.body.type)
            propertyTypeFilter = {
                [Op.eq]: req.body.type
            };
        else 
            propertyTypeFilter = {
                [Op.not] : null
            };
        if(req.body.location)
            locationFilter = {
                [Op.eq]: req.body.location
            };
        else 
            locationFilter = {
                [Op.not]: null
            };
        
        return new Promise(resolve => {
            // find and count the properties available to filters
            Property.findAndCountAll({
                where: {
                    $and: [
                        {
                            $or: [
                                {
                                    price: {
                                        [Op.lte] : req.body.price
                                    },
                                },
                                {
                                    price: {
                                        [Op.eq] : null
                                    }
                                }
            
                            ],
                        },
                        {
                            $or: [
                                {
                                    bedCount: {
                                        [Op.gte] : req.body.beds
                                    },
                                },
                                {
                                    bedCount: {
                                        [Op.eq] : null
                                    }
                                }
                            ]
                        }
                    ],
                    
                    propertyType: propertyTypeFilter,
                    city: locationFilter
                },
                order: [
                    ['id', 'desc']
                ]
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                throw err;
            });
        });
    }

    function getProperty(propertyId) {
        return new Promise(resolve => {
            Property.findOne({
                where: {
                    id: propertyId,
                },
                include: [{model: User, as: "user"}, {model: Image, as: "images"}]
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                throw err;
            });
        });
    }

    function getLaterThan(req) {
        return new Promise(resolve => {
            filterAllAndCountPost(req)
                .then(results => {
                    var properties = results.rows;
                    var lastPropertyId = req.body.lastPropertyId;
                    var response = {};
                    response.count = 0
                    response.properties = [];

                    properties.forEach(element => {
                        if(element.id < lastPropertyId) {
                            response.properties.push(element);
                            response.count += 1;
                        }
                    });

                    resolve(response);
                }).catch(err => {
                    throw err;
                });
        });
    }

    function getLatestProperties() {
        return new Promise(resolve => {
            Property.findAll({
                order: [
                    ['id', 'desc']
                ],
                limit: 6,
                include : [
                    {model: Image, as: "images"}
                ]
            }).then(result => {
                resolve(result);
            }).catch(err => {
                throw err;
            });
        });
        
    }

    function getAllProperties(){
        return new Promise(resolve => {
            Property.findAll()
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    throw err;
                });
        });
    }

    function deleteProperty(id){
        return new Promise(resolve => {
            Property.destroy({
                where: {
                    id: id
                }
            }).then(result => {
                resolve(result);
            }).catch(err => {
                throw err;
            });
        });
    }

    function updateProperty(id, query) {
        return new Promise(resolve => {
            Property.update(query, {where: {id: id}}).then(res => {
                resolve(res);
            }).catch(ex => {
                throw ex;
            });
        });
    }

    return {
        filterAllAndCountPost,
        filterAllAndCountGet, 
        createProperty, 
        getProperty, 
        getLaterThan, 
        getLatestProperties, 
        getAllProperties,
        deleteProperty,
        updateProperty
    };
}
