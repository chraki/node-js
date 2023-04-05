const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfigurator');

const m_Email = sequelize.define('m_Email', 
   {
      Subject: {
         type: DataTypes.STRING(250),
         allowNull: false
      },
      EmailURL: {
         type: DataTypes.STRING(250),
         allowNull: true
      }, 
      CreatedOn: {
         type: DataTypes.DATE,
         allowNull: false
      }
   }, {
      tableName: 'm_Email',
      timestamps: false,
   });

module.exports = m_Email ;