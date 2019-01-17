module.exports = (sequelize, Sequelize) => {
    var Information = sequelize.define("information", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        body: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Information;
}