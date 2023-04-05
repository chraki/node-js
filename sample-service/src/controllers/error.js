'use strict';
const { STATUS_CODES } = require('../constants');
const { responseBuilder } = require('../response-builder');
const loggerService = require('../services/logger.service');

/**
 * Common controller for error handling 
 */
class ErrorController {

   /**
    * common error handler
    */
   notFound() {
      return (req, res, next) => {
         if (!res.headersSent) {
            res.status(STATUS_CODES.NOT_FOUND).send(responseBuilder({
               code: STATUS_CODES.NOT_FOUND,
               message: `${req.originalUrl} not found`
            }));
         }

         if (next) return next();
      };
   }

   defaultErrorHandler() {
      return function (err, req, res, next) {
         let { logger } = loggerService;
         if (res.headersSent) {
            if (next) return next(err);
         }

         res.header('content-type', 'application/json');
         let message = (typeof (err) === 'object' ? err.message : err);

         logger.error('[ERROR] [LAST CATCH]', {
            args: { message, error: err }
         });

         res.status(STATUS_CODES.INTERNAL_ERROR).send(responseBuilder({
            code: STATUS_CODES.INTERNAL_ERROR,
            message
         }));

         if (next) return next();

      };
   }
}
module.exports = { ErrorController };
