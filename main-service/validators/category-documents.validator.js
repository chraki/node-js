const Joi = require('joi');

exports.DocumentsValidator = () => {
   return  Joi.object({
      'page_no': Joi.number(),
      'page_size': Joi.number(),
      'category_id': Joi.number(),
      'search_file': Joi.string().allow(''),
      'file_access': Joi.boolean(),
      'from_date': Joi.string(),
      'to_date': Joi.string(),
      'country_id':Joi.number().required(),
   });
};

exports.uploadDocumentSchema = () => {
   return  Joi.object({
      'document_id': Joi.number().required(),
      'category_id': Joi.number().required(),
      'file_title': Joi.string().required(),
      'description': Joi.string().allow(''),
      'is_download': Joi.boolean().required(),
   });
};