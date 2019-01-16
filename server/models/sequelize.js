const Sequelize = require("sequelize");

const UserModel = require("./User");
const PropertyModel = require("./Property");
const ImageModel = require("./Image");

module.exports = (env) => {
  const config = require("../config/mysql_config")[env];

  // initialize connection
  const sequelize = new Sequelize(config);

  // initialize empty object
  let models = {};
  models.relations = {};

  // create object models
  const User = UserModel(sequelize, Sequelize);
  const Property = PropertyModel(sequelize, Sequelize);
  const Image = ImageModel(sequelize, Sequelize);

  const PropertyUser = Property.belongsTo(User, {foreignKey: {allowNull: true}, as: "user",  onDelete: 'CASCADE'});
  const ImageProperty = Property.hasMany(Image, {onDelete: "CASCADE"});

  if(env === "development")
    sequelize.sync({force: true})
      .then(() => {
        console.log("database synchronized");
      });
  
  models.User = User;
  models.Property = Property;
  models.Image = Image;
  models.relations.PropertyUser = PropertyUser;
  models.relations.ImageProperty = ImageProperty;

  return models;
}