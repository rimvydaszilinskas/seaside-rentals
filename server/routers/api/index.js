const router = require("express").Router();
const Op = require("sequelize").Op;

module.exports = (config) => {
    let Property = config.models.Property;

    router.post("/filter/count", (req, res) => {
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
            }
        }).then((result) => {
            // respond back with just a count
            res.json(result.count);
        }).catch((err) => {
            // send back the error
            res.json({err: err})
        });
    });

    router.post("/filter", (req, res) => {
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
        
        // find and count the properties available to filters
        Property.findAll({
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
            }
        }).then((result) => {
            // respond back with just a count
            res.json(result.count);
        }).catch((err) => {
            // send back the error
            res.json({err: err})
        });
    });
    return router;
};