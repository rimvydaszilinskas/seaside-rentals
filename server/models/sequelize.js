const Sequelize = require("sequelize");

const UserModel = require("./User");
const PropertyModel = require("./Property");

module.exports = (env) => {
  const config = require("../config/config")[env];

  // initialize connection
  const sequelize = new Sequelize(config);

  // create object models
  const User = UserModel(sequelize, Sequelize);
  const Property = PropertyModel(sequelize, Sequelize);

  Property.belongsTo(User, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});

  // sequelize.sync({force: true})
  //   .then(() => {
  //     console.log("database synchronized");
  //   });

  return {User, Property};
}