const { S3Service } = require('../../../sample-service');
const { Models: { KcLearningCountries } } = require('../../../lib-db-schemas');
const { COUNTRY_IMAGES } = require('../constants');
const { aws, aws_buckets } = require('../../config/config');
const { loggerService: { logger } } = require('../../../sample-service');

exports.getCountries = async() => {
   try {
      const countries = await KcLearningCountries.findAll({
         attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      let countriesDetails = await Promise.all(countries.map(async(country)  => {
         const imageName = country.ImageName;
         const filePath = COUNTRY_IMAGES.S3_PATH.replace('{{images}}',`${imageName}`);
         const imageUrl = await (new S3Service(aws)).getSignedURLForObject(
            aws_buckets.kcLearnings_documents,
            `${filePath}`, COUNTRY_IMAGES.EXPIRES_IN);   
         country.dataValues['ImageUrl'] =  imageUrl;
         return country;
      }));
      return countriesDetails;
   } catch (error) {
      logger.error('Error while getting countries: ', {
         args: {
            error: error?.message, stack: error?.stack
         }
      });
      return [];
   }
};