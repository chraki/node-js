const { kcLearningDetails } = require('./get-details');

exports.applyRoutes = (router) => {
   kcLearningDetails(router);
   return router;
};