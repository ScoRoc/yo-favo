'use strict';
module.exports = (sequelize, DataTypes) => {
  var favos_users = sequelize.define('favos_users', {
    userId: DataTypes.INTEGER,
    favoId: DataTypes.INTEGER
  }, {});
  favos_users.associate = function(models) {
    // associations can be defined here
  };
  return favos_users;
};