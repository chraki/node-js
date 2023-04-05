const path = require('path');
if(!process.env.DB_USER)
   require('dotenv').config({ path: path.resolve('../.env')});

module.exports = {
   username: process.env.KC_LEARNING_DB_USER,
   password: process.env.KC_LEARNING_DB_PASS,
   host: process.env.KC_LEARNING_DB_HOST,
   database: process.env.KC_LEARNING_DB_NAME,
   dialect: 'mssql',
   port: process.env.DB_PORT,
   logging: false,
   seederStorage: 'sequelize',
   pool:{
      max: 10,
      acquire: 40000,
      idle: 2000,     
      evict: 1000
   }
};