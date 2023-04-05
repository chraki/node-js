'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('KcLearningCountries', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         Name: {
            type: Sequelize.STRING,
            allowNull: false
         },
         ImageName: {
            type: Sequelize.STRING,
            allowNull: true
         },
         createdAt: {
            type: Sequelize.DATE
         },
         updatedAt: {
            type: Sequelize.DATE
         }
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('KcLearningCountries');
   }
};