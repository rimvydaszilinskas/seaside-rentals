module.exports = (sequelize, Sequelize) => {
    return sequelize.define("image", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        primary: {
            type: Sequelize.BOOLEAN
        }
    })
}