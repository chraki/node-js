const {DataTypes} = require('sequelize');
const {sequelize} = require('../dbConfigurator');

const CategoryDocuments = sequelize.define('CategoryDocuments', 
   {   
      FileTitle: {
         type: DataTypes.STRING(500),
         allowNull: true
      },
      Description:{
         type: DataTypes.STRING(500),
         allowNull: true
      },
      FileName: {
         type: DataTypes.STRING(150),
         allowNull: true
      },
      CreatedAt: {
         type: DataTypes.DATEONLY,
         allowNull: false
      },
      CategoryId:{
         type: DataTypes.INTEGER,
         allowNull: false
      },
      IsDownloadable: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      },
      OriginalFileName: {
         type: DataTypes.STRING(150),
         allowNull:true
      }
   }, {
      timestamps: false,
   });

module.exports = CategoryDocuments ;