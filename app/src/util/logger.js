'use strict';

const winston = require('winston');
const logger = new(winston.Logger)({
  transports: [new(winston.transports.Console)({handleExceptions: true, json: true})]
});

module.exports = {
  debug: (message) => {
    logger.log('info', message);
  },
  error: (message) => {
    logger.log('error', message);
  }
};
