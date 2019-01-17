const Op = require("sequelize").Op;

module.exports = (config) => {
    const User = config.models.User;
    const Property = config.models.Property;
    const Image = config.models.Property;
    
    function getUser(id) {
        return new Promise(resolve => {
            User.findOne({
                where: {
                    id: id,
                }
            }).then(user => {
                resolve(user);
            }).catch(err => {
                throw err;
            });
        });
    }

    function getAllUsers() {
        return new Promise(resolve => {
            User.findAll().then(users => {
                resolve(users);
            }).catch(err => {
                throw err;
            });
        });
    }

    function deleteUser(id) {
        return new Promise(resolve => {
            User.destroy({
                where: {
                    id: id
                }
            }).then(response => {
                resolve(response);
            }).catch(err => {
                throw err;
            });
        });
    }

    function updateUser(id, query) {
        return new Promise(resolve => {
            User.update(query, {where: {id: id}}).then(res => {
                resolve(res);
            }).catch(ex => {
                throw ex;
            });
        });
    }

    return {getUser, getAllUsers, deleteUser, updateUser};
}