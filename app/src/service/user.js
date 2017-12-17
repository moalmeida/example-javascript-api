'use strict';

let Promise = require('bluebird');
let User = require('../model/user');

const load = (username, password) => {
  return new Promise((resolve, reject) => {
    return User.findOne({
      'local.username': username
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data && data.local.username === username && data.validPassword(password, data.local.password)) {
        resolve(data);
      }
      reject();
    });
  });
};

const save = (username, password) => {
  return new Promise((resolve, reject) => {
    let user = new User({'local.username': username});
    user.local.password = user.generateHash(password);
    user.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  });
};

module.exports = {
  load,
  save
};
