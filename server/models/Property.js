module.exports = (sequelize, Sequelize) => {
    var Property = sequelize.define("property", {
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
            allowNull: true,
            validate: {
                isIn: [["kambarys", "butas", "namas"]]
            }
        },
        roomcount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        bedcount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    Property.prototype.getDate = (date) => {
        var dayOfWeek = 0;
        var month = 1;
        var day = 2;
        var year = 3;
        var time = 4;
        var split = String(date).split(" ");
        var monthNumber;

        switch(split[month]){
            case "Jan":
                monthNumber = "01";
                break;
            case "Feb":
                monthNumber = "02";
                break;
            case "Mar":
                monthNumber = "03";
                break;
            case "Apr":
                monthNumber = "04";
                break;
            case "May":
                monthNumber = "05";
                break;
            case "Jun":
                monthNumber = "06";
                break;
            case "Jul":
                monthNumber = "07";
                break;
            case "Aug":
                monthNumber = "08";
                break;
            case "Sep":
                monthNumber = "09";
                break;
            case "Oct":
                monthNumber = "10";
                break;
            case "Nov":
                monthNumber = "11";
                break;
            case "Dec":
                monthNumber = "12";
                break;
        }
        
        return `${split[year]}-${monthNumber}-${split[day]}`;
    }

    return Property;
}