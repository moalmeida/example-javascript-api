'use strict';

const Promise = require("bluebird");
const redis = require("redis");
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let cache_host = process.env.CACHE_HOST || 'localhost';
let cache_port = process.env.CACHE_PORT || '6379';
let cache_options = {
  detect_buffers: true
};

const instance = () => {
  return redis.createClient(cache_port, cache_host, cache_options);
}

module.exports = {
  instance
};
