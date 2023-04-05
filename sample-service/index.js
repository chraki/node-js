const loggerService = require('./src/services/logger.service');

module.exports = {
   ...require('./src/constants'),
   ...require('./src/env-config/config'),
   ...require('./src/uploader'),
   ...require('./src/controllers/error'),
   ...require('./src/controllers/health-check'),
   ...require('./src/response-builder'),
   ...require('./src/util/custom-error'),
   ...require('./src/services/s3.service'),
   // ...require('./src/service-call'),
   ...require('./src/middelware/service-config'),
   // ...require('./src/services/cipher'),
   loggerService
};