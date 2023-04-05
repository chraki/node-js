'use strict';

let Sequelize = require('sequelize');
const OP = Sequelize.Op;
const OPERATORS = {
   IN: 'IN',
   LIKE: 'LIKE',
   EQ: 'EQ',
   LT: 'LT',
   GT: 'GT',
   LE: 'LE',
   GE: 'GE',
   NE: 'NE',
   OR: 'or',
   AND: 'and',
   CONTAINS:'CONTAINS',
   CONTAINED:'CONTAINED'
};

class Utils {
   /**
     * Method to generate formatted string from filter value
     * @param {*} val 
     * @param {string} operator 
     * @returns {string|object}
     */
   static getFormattedValue(val, operator) {
      switch (operator.toUpperCase()) {
         case OPERATORS.EQ:
            return val;
         case OPERATORS.LT:
            return { [OP.lt]: val };
         case OPERATORS.GT:
            return { [OP.gt]: val };
         case OPERATORS.LE:
            return { [OP.lte]: val };
         case OPERATORS.GE:
            return { [OP.gte]: val };
         case OPERATORS.NE:
            return { [OP.ne]: val };
         case OPERATORS.IN:
            return { [OP.in]: val };
         case OPERATORS.LIKE:
            return { [OP.like]: ('%' + val) };
         case OPERATORS.AND:
            return { [OP.and]: val };
         case OPERATORS.OR:
            return { [OP.or]: val };
         case OPERATORS.CONTAINS:
            return { [OP.contains]: val };
         case OPERATORS.CONTAINED:
            return { [OP.contained]: val };
         default:
            return val;
      }
   }

   /**
     * Method to create JSON object 
     * @param {string} fieldKey
     * @param {string} operatorKey
     * @param {string} valKey
     * @return json object
     */
   static convertToJSONObject(fieldKey, operatorKey, valKey, flag) {
      let jsonObj = {};
      if (flag || !operatorKey) {
         jsonObj = {
            [fieldKey]: valKey
         };
      } else {
         jsonObj.field = fieldKey;
         jsonObj.operator = operatorKey;
         jsonObj.value = valKey;
      }
      return jsonObj;
   }
}

module.exports = {
   Utils,OPERATORS
};
