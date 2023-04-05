
'use strict';

const dbConfigurator = require('./dbConfigurator');

class LibDbSchema {
   constructor() {
      this.Models = null;
   }
   init(connection) {
      dbConfigurator.connection = connection;
      this.Models = this.fetchModels();
   }

   fetchModels() {
      if (null !== this.Models) return this.Models;
      return { ...require('./models') };
   }
}

module.exports = new LibDbSchema();