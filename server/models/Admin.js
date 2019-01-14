module.exports = (sequelize, Sequelize) => {
    return sequelize.define("admin", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            alowNull: false
        },
        passowrd: {
            type: Sequelize.STRING,
            alowNull: false
        }
    });
};