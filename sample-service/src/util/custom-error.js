/**
 * This class is to create validation errors
 */
class CustomError extends Error {
   /**
     * @param {Number} error_code 
     * @param {String | Object} error 
     * @param {String} name 
     */
   constructor(error_code, error, name = 'CustomError') {
      let message = CustomError.getMessage(error);
      super(message);
      this.name = name;
      this.code = error_code;
      this.timestamp = new Date().toISOString();
   }

   /**
     * To create json for exception
     * @param {String} source 
     * @returns 
     */
   toJSON(source) {
      return {
         error_source: source,
         error_code: this.code,
         error_message: this.message,
         error_stack: this.stack,
         timestamp: this.timestamp
      };
   }

   /**
     * This method will get the message 
     * @param {*} error 
     * @returns 
     */
   static getMessage(error) {
      let message;
      if (typeof error === 'string') {
         message = error;
      }
      //if error is object to fetch message string
      if (typeof error === 'object') {
         if (error.message) {
            message = error.message;
         }
      }
      return message;
   }
}

module.exports = { CustomError };