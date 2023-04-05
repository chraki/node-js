const {DataTypes} = require('sequelize');
const {sequelize} = require('../dbConfigurator');

const CountryCategories = sequelize.define('CountryCategories', 
   {
      Name: {
         type: DataTypes.STRING(250),
         allowNull: false
      },
      CountryId: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
   },{
      timestamps: true,
   });

module.exports = CountryCategories ;