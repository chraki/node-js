const { STATUS_CODES, responseBuilder } = require('../../sample-service');

exports._handleException = async (error, res, message) => {
   let customError = {
      code: STATUS_CODES.INTERNAL_ERROR,message
   };
   if (error.name === 'ValidationError') {
      customError = error;
   }
   res.status(customError.code).send(responseBuilder(customError));
};