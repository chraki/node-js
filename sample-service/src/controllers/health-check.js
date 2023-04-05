'use strict';
const loggerService = require('../services/logger.service');
const TIME_INTERVAl = 300; //SECONDS

/**
 * Class for checking health of the sercvice
 */
class HealthCheckController {
   constructor(sequelize, time) {
      this.sequelize = sequelize;
      this.timeInterval = time || TIME_INTERVAl;
      this.status = 'OK';
      this.logger = loggerService.logger;
   }

   /**
     * Function to return in case if the service is healthy.
     */
   healthy() {
      return async (req, res) => {
         if (this.sequelize) {
            await this.dbHealthCheck();
         }
         res.status(200).send(({
            'uptime': process.uptime(),
            'health': this.status
         }));
      };
   }

   /**
     * This method checks db health 
     * that is it checks connection to db established or not
     */
   async dbHealthCheck() {
      this.previousRequestTime = new Date();
      if (this.sequelize) {
         try {
            await this.sequelize.authenticate();
         } catch (err) {
            this.logger.error('checkDbConnection', { args: { err } });
            this.status = 'Error';
         }
      }
   }

   /**
     * This method returns time-intervals between requests
     * @returns { number }
     */
   getTimeIntervalsBetWeenRequests() {
      return Math.ceil(
         (new Date().getTime() - this.previousRequestTime.getTime()) / 1000);

   }


}

module.exports = { HealthCheckController };
