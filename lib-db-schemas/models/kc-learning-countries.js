const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfigurator');

const KcLearningCountries = sequelize.define('KcLearningCountries', 
   {
      Name: {
         type: DataTypes.STRING(250),
         allowNull: false
      },
      ImageName: {
         type: DataTypes.STRING(250),
         allowNull: true
      },
   }, {
      timestamps: true,
   });

module.exports = KcLearningCountries ;