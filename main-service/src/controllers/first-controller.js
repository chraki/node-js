const countryServices=require('../services/first-service');
const {loggerService:{logger},responseBuilder}=require('../../../sample-service');
const {_handleException}=require('../utils');

class KcLearningCountriesController {
   getCountriesDetails() {
      return async(req, res) => {
         try {
            res.send(responseBuilder('', {data:await countryServices.getCountries()}));
         } catch (error) {
            logger.error('Error occured fetching countries', {
               args: { error: error?.message, stack: error?.stack }
            });
            _handleException(error, res,
               'Sorry! something went wrong not able fetch the country');
         }
      };
   }
}

module.exports = new KcLearningCountriesController();