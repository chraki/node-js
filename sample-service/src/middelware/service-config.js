// const { Cipher } = require('../services/cipher');
// const { SECRET_KEY_OF } = require('../constants');
// /**
//  * ServiceMiddleware
//  *
//  * adds the specified to the request object
//  */
// class ServiceMiddleware {
//    constructor(logger) {
//       this.logger = logger;
//    }

//    /**
//     * binds the property to request object
//     * @returns {Function}
//     */
//    bind() {
//       return async (req, res, next) => {
//          if (req?.headers?.['x-user']) {
//             try {
//                let user = (new Cipher(SECRET_KEY_OF.JWT_PAYLOAD)).decrypt(
//                   req.headers['x-user']);
//                req.user = JSON.parse(user);
//             } catch (e) {
//                this.logger.error('[ServiceMiddleware] [ERROR]', {
//                   args: {
//                      error: e.message,
//                      error_stack: e.stack
//                   }
//                });
//             }
//          }
//          next();
//       };
//    }
// }

// module.exports = { ServiceMiddleware };