const config = require('../../config/database');
const Sequelize = require('sequelize');

let sequelize = new Sequelize(config);
module.exports = { sequelize };
