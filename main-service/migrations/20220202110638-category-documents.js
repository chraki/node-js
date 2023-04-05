'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('CategoryDocuments', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         FileTitle: {
            type: Sequelize.STRING,
            allowNull: true
         },
         Description:{
            type: Sequelize.STRING(500),
            allowNull: true
         },
         FileName: {
            type: Sequelize.STRING,
            allowNull: true
         },
         CreatedAt: {
            type: Sequelize.DATEONLY,
            allowNull: false
         },
         CategoryId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'CountryCategories',
               key: 'id',
            }
         },
         IsDownloadable: {
            type: Sequelize.BOOLEAN,
            allowNull: false
         },
         OriginalFileName: {
            type: Sequelize.STRING,
            allowNull:true
         }
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('CategoryDocuments');
   }
};