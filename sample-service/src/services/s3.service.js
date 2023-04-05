const aws = require('aws-sdk');
const loggerService = require('./logger.service');
const stream = require('stream');

/**
 * This service will create connection with AWS s3 to
 * upload and delete objects in s3 bucket
 */
class S3Service {
   constructor(awsConfig) {
      this.s3 = new aws.S3(awsConfig);
   }

   /**
    * This method will check whether file exists on specified bucket or not
    * @param {*} bucket 
    * @param {*} filename 
    * @returns 
    */
   isObjectExists(bucket, filename) {
      return new Promise((resolve) => {
         this.s3.headObject({
            Bucket: bucket,
            Key: filename
         }, function (err, data) {
            if (err && err.code === 'NotFound') {
               resolve(false);
               return;
            }
            resolve(data);
         });
      });
   }
   
   /**
    * This will prepare delete objects for s3 delete
    * @param {Array<String>} filenames 
    * @returns {Array<Object>}
    */
   prepareDeleteObjects(filenames) {
      return filenames.map((filename) => {
         return { Key: filename };
      });
   }

   /**
    * This method will delete specified files in specified s3 bucket
    * @param {Array<String>} filenames 
    * @param {String} bucket 
    * @returns {Promise<Object>}
    */
   deleteObjects(filenames, bucket) {
      const { logger } = loggerService;
      return new Promise((resolve, reject) => {
         this.s3.deleteObjects({
            Bucket: bucket,
            Delete: {
               Objects: this.prepareDeleteObjects(filenames)
            }
         }, function (err, data) {
            if (err) {
               logger.error('Deleting object on S3 failed', { args: { filenames, err } });
               reject(err);
            } else {
               logger.debug(`Successfully ${filenames.toString()} deleted from S3`);
               resolve(data);
            }
         });
      });
   }

   /**
    * This method will creates signed url for specified object with 
    * specified expire time
    * @param {*} bucket 
    * @param {*} filename 
    * @param {*} expires 
    */
   getSignedURLForObject(bucket, filename, expires) {
      let params = {
         Bucket: bucket,
         Key: filename,
         Expires: expires
      };
      const { logger } = loggerService;
      return new Promise((resolve, reject) => {
         this.s3.getSignedUrl('getObject', params, function (err, url) {
            if (err) {
               logger.error('Error occured while preparing signed url', {
                  args: { params, fileName: __filename }
               });
               reject(err);
            } else {
               resolve(url);
            }
         });
      });
   }

   /**
    * This method moves object to specified location and deletes the 
    * object at old path
    * @param {*} bucket 
    * @param {*} oldPath 
    * @param {*} newPath 
    * @returns {*}
    */
   async moveObject(bucket, oldPath, newPath, deleteObject = true) {
      const copyparams = {
         Bucket: bucket,
         CopySource: bucket + '/' + oldPath,
         Key: newPath
      };
      let data = await this.s3.copyObject(copyparams).promise();
      if (deleteObject) await this.deleteObjects([oldPath], bucket);
      return data;
   }

   /**
    * This method upload the file to s3
    * @param {*} Bucket 
    * @param {*} Key 
    * @returns 
    */
   uploadObjectStream(Bucket,Key) {
      const pass = new stream.PassThrough();
      return {
         writeStream: pass,
         upload: this.s3.upload({ Bucket, Key, Body: pass }).promise(),
      };
   }
   
   getObjectStreamFromS3(Bucket,fileName) {
      return this.s3.getObject({
         Bucket,
         Key: fileName
      }).createReadStream();
   }
}

module.exports = { S3Service };

