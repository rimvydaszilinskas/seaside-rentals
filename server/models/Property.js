module.exports = (sequelize, Sequelize) => {
    return sequelize.define("property", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        }, 
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        propertyType: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            validate: {
                isIn: [["kambarys", "butas"]]
            }
        },
        roomcount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        bedcount: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
}