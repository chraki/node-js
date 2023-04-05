
class DbConfigurator {
   constructor() {
      this.sequelize = null;
   }
   /**
   * To set sequelize connection instance
   * @param {*} connection 
   */
   set connection(connection) {
      if (null === this.sequelize) this.sequelize = connection;
   }
   /**
   * To get sequelize connection instance
   * @returns {Object<sequelize>}
   */
   get connection() {
      return this.sequelize;
   }
}

module.exports = new DbConfigurator();