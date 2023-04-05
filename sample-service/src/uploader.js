const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');
const { S3Service } = require('./services/s3.service');
const loggerService = require('./services/logger.service');
const { CustomError } = require('./util/custom-error');
const { STATUS_CODES } = require('./constants');

/**
 * This class will help to build upload for microservice
 */
class Uploader {
   constructor(settings = {}) {
      let { file, storage, bucket, checkIfFileExistsInBucket } = settings;
      this.config = require(path.resolve('./config/config'));
      this.validFileExts = file?.validExts || [];
      this.invalidFileExts = file?.invalidExts || [];
      this.storage = storage || 's3';
      this.acl = file?.access || 'public-read';
      this.uploadDirectory = file?.uploadDirectory || '';
      this.bucket = bucket || this.config.bucket;
      this.isfileFilterEnabled = true;
      this.logger = loggerService.logger;
      this.s3Service = new S3Service(this.config.aws);
      this.checkIfFileExistsInBucket = checkIfFileExistsInBucket || false;
      this.customCleanNameFunction = settings.cleanFileOriginalName || null;
      this.dynamicUploadPathKey = settings.dynamicUploadPathKey || null;
      this.useCustomContentType = settings.useCustomContentType || false;
   }

   getContentType() {
      return (req, file, cb) => {
         cb(null, file.mimetype);
      };
   }
   /**
    * This method parses the extensions
    * @param {*} value 
    * @returns {Array<string}
    */
   parseExtensions(value) {
      return Array.from(new Set(
         ((typeof (value) === 'string')
            ? value.split(',') : Array.from(value || []))
            .filter(v => v && v.length > 0)
            .map(ext => ext.toLowerCase().trim().replace(/^\./, ''))
      ));
   }

   fileName(name) {
      if (this.customCleanNameFunction) {
         return this.customCleanNameFunction(name);
      }
      return Date.now() + '-' + name;
   }
   /**
    * This method creates storage instance
    * @returns 
    */
   buildStorage() {
      if (this.storage === 's3') {
         return multerS3({
            s3: this.s3Service.s3,
            acl: this.acl,
            contentType: this.useCustomContentType ? 
               this.getContentType() : multerS3.AUTO_CONTENT_TYPE,
            bucket: this.bucket,
            key: async (req, file, cb) => {
               let filePath = this.uploadDirectory;
               if (this.dynamicUploadPathKey) {
                  filePath = path.join(filePath, req.body[this.dynamicUploadPathKey]);
               }
               filePath = path.join(filePath, this.fileName(file.originalname));
               // will check if file already exists or not
               if (this.checkIfFileExistsInBucket &&
                  await this.s3Service.isObjectExists(this.bucket, filePath)) {
                  return cb(new CustomError(STATUS_CODES.PRECONDITION_FAILED,
                     'File already exists', 'ValidationError'
                  ));
               }
               cb(null, filePath);
            }
         });
      }
      if (this.storage === 'memory') {
         return multer.memoryStorage();
      }
      return multer.diskStorage({
         destination: function (req, file, cb) {
            try {
               if (!fs.existsSync('/tmp/uploads')) {
                  fs.mkdirSync('/tmp/uploads');
               }
            } catch (error) {
               this.logger.error(error);
            }
            cb(null, '/tmp/uploads');
         },
         filename: (req, file, cb) => {
            cb(null, this.fileName(file.originalname));
         }
      });
   }

   /**
    * This method will return file filter callback
    * @returns {function}
    */
   fileFilter() {
      return (req, file, callback) => {
         if (!file || !file.originalname) {
            callback(new CustomError(STATUS_CODES.INVALID_ENTITY,
               'Sorry! We are not able to process the upload content',
               'ValidationError'));
            return;
         }
         let filetype = path.extname(file.originalname)
            .toLowerCase().replace(/^\./, '');
         let valid = this.parseExtensions(req.query.valid || this.validFileExts);
         let invalid = this.parseExtensions(req.query.invalid || this.invalidFileExts);


         if (invalid.includes(filetype)
            || (valid.length > 0 && !valid.includes(filetype))) {
            this.logger.error('valid file extensions', { args: { valid } });
            this.logger.error('invalid file extension', { args: { invalid } });
            return callback(new CustomError(
               STATUS_CODES.BAD_REQUEST,
               `Filetype ${filetype} is not allowed!`,
               'ValidationError'
            ));
         }
         callback(null, true);
      };
   }

   /**
    * This method will create new upload instance
    * @param {*} settings
    * @returns {Object}
    */
   static build(settings = {}) {
      let uploader = new Uploader(settings);
      let config = {
         storage: uploader.buildStorage()
      };
      if (uploader.isfileFilterEnabled) {
         config['fileFilter'] = uploader.fileFilter();
      }
      return multer(config);
   }
}

module.exports = { Uploader };

