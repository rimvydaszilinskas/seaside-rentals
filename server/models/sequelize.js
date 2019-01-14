const Sequelize = require("sequelize");
const UserModel = require("./User.js");

module.exports = (config) => {
    const sequelize = new Sequelize({
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        logging: false
    });

    const User = UserModel(sequelize, Sequelize);

    return User;
}