'use strict';

let cache = require('../util/cache');

const incremental = () => {
  return get().then((v) => {
    if (v) {
      return set(eval(v) + 1)
    }
    return set(0);
  }).catch((e) => {
    throw e;
  })
};

const get = () => {
  return new Promise((resolve, reject) => {
    return cache.instance().get('count', (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply || 0);
    });
  });
};

const set = (number) => {
  return new Promise((resolve, reject) => {
    cache.instance().set('count', number, (err) => {
      if (err) {
        reject(err);
      }
      resolve(number || 0);
    });
  });
};

module.exports = {
  incremental,
  get,
  set
};
