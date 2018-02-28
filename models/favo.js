'use strict';
module.exports = (sequelize, DataTypes) => {
  var favo = sequelize.define('favo', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    wTeaser: DataTypes.STRING,
    wUrl: DataTypes.STRING,
    yUrl: DataTypes.STRING,
    yId: DataTypes.STRING
  }, {});
  favo.associate = function(models) {
    // associations can be defined here
  };
  return favo;
};