const countriesController = require('../controllers/first-controller');

const kcLearningDetails = (route) => {
   route.get('/v1/kcl/countries' , 
      countriesController.getCountriesDetails());
};

module.exports = { kcLearningDetails };