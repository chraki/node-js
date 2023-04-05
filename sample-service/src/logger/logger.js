const winston = require('winston');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;
const { LOGGER } = require('../constants');

/**
 * This class will load default configs and creates 
 * new logger instance 
 */
class Logger {
   constructor(settings = {}) {
      let { logs } = settings;
      this.NODE_ENV = process.env.NODE_ENV;
      this.logger = null;
      this.logsDirectory = logs.directory;
      /**
     * const levels = { 
         error: 0,
          warn: 1,
          info: 2,
          http: 3,
          verbose: 4,
          debug: 5,
          silly: 6
        };
      */
      this.logLevels = settings.levels || winston.config.npm.levels;
      this.datePattern = settings.datePattern || LOGGER.DATE_PATTERN;
      this.maxFileSize = settings.maxFileSize || LOGGER.MAX_FILE_SIZE; //10mb
      this.logsAliveTime = settings.logsAliveTime || LOGGER.LOG_FILE_ALIVE_TIME; //14 days
      this.zippedArchive = true;
      this.loggerConfigs = this.defaultLoggerConfigs();
   }

   defaultLogFormat() {
      return printf((info) => {
         let { level, message, timestamp, args } = info;
         let log = `[${timestamp}] [${level}] [${message}]`;
         if (typeof args === 'object') {
            log += ` [Meta:${JSON.stringify(args)}]`;
         }
         return log;
      });
   }

   createFileName(name) {
      return `${name ? name : 'combined'}-%DATE%-${process.env.NODE_ENV}.log`;
   }

   createTransport(level) {
      return new transports.DailyRotateFile({
         filename: path.resolve(this.logsDirectory, this.createFileName(level)),
         datePattern: this.datePattern,
         zippedArchive: this.zippedArchive,
         maxSize: this.maxFileSize,
         maxFiles: this.logsAliveTime,
         level: level
      });
   }

   defaultLoggerConfigs() {
      let config = {
         levels: this.logLevels,
         format: combine(timestamp(), this.defaultLogFormat()),
         transports: [
            new transports.Console({ level: 'debug' })
         ],
         exceptionHandlers: [
            this.createTransport('exceptions')
         ],
         rejectionHandlers: [
            this.createTransport('rejections')
         ],
         exitOnError: false
      };
      if (process.env.NODE_ENV !== 'development') {
         config.transports = [
            ...config.transports,
            this.createTransport('error'),
            this.createTransport()
         ];
      }
      return config;
   }

   createLogger() {
      if (null === this.logger) {
         this.logger = createLogger(this.loggerConfigs);
      }
      return this.logger;
   }
}

module.exports = Logger;