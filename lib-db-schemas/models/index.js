const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Models = {};

/**
 * This method loads all models into the models
 * @returns {Object}
 */
const loadModels = () => {
   fs
      .readdirSync(__dirname)
      .filter((file) => {
         return (file.indexOf('.') !== 0 
         && file !== basename 
         && file.slice(-3) === '.js');
      })
      .forEach((file) => {
         const model = require(path.join(`${__dirname}`, file));
         Models[model.name] = model;
      });
};

/**
 * This method establishes association of models
 */
const associateModels = () => {
   Object.keys(Models).forEach((modelName) => {
      if (Models[modelName].associate) {
         Models[modelName].associate(Models);
      }
   });
};

loadModels();
associateModels();

module.exports = Models;