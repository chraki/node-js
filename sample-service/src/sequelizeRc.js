const path = require('path');

class SequelizeRC {
   createRC() {
      return {
         'config': path.resolve('config', 'database.js'),
         'models-path': path.resolve('../../lib-db-schemas/models'),
         'seeders-path': path.resolve('./seeders'),
         'migrations-path': path.resolve('./migrations')
      };
   }
}

module.exports = { SequelizeRC };