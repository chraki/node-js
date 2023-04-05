const Logger = require('../logger/logger');

/**
 * This service class will be used to initialize new logger
 */
class LoggerService {
   constructor() {
      this.logger = {};
   }
   init(settings){
      this.logger = new Logger(settings).createLogger();
   }
}

module.exports = new LoggerService();