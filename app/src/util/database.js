'use strict';

const promise = require("bluebird");
const mongoose = require('mongoose');
const nosql_host = process.env.NOSQL_HOST || 'localhost';
const nosql_port = process.env.NOSQL_PORT || 27017;
const nosql_db = process.env.NOSQL_DB || 'example';
const nosql_options = {
  useMongoClient: true
}

mongoose.Promise = promise;

const instance = () => {
  mongoose.connect('mongodb://' + nosql_host + ':' + nosql_port + '/' + nosql_db, nosql_options);
  return mongoose;
}

module.exports = {
  instance
};
