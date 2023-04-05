const path = require('path');
const _ = require('lodash');

class Config {
   constructor() {
      this.defaultConfigs = {};
   }

   defaults(defaults) {
      if (defaults && typeof defaults === 'object') this.defaultConfigs = { ...defaults };
      return this;
   }

   getEnvironment() {
      return process.env.NODE_ENV;
   }

   getEnvConfigFileName() {
      return `config.${this.getEnvironment()}.js`;
   }

   getEnvironmentConfigs() {
      return require(path.resolve(`config/${this.getEnvConfigFileName()}`));
   }

   getServiceConfigs(){
      return require(`./${this.getEnvironment()}.json`);
   }
   
   export() {
      let env = this.getEnvironment();
      if (!env || !env.trim()) {
         process.exit(9);
      }
      this.defaultConfigs.services = this.getServiceConfigs();
      return _.merge(this.defaultConfigs, this.getEnvironmentConfigs());
   }
}

module.exports = { Config };