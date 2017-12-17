'use strict';

let Promise = require('bluebird');
let User = require('../model/user');

const list = () => {
  return new Promise((resolve, reject) => {
    return User.find({}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

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

const isValid = (username) => {
  return new Promise((resolve, reject) => {
    return User.findOne({
      'local.username': username
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data && data.local.username === username) {
        resolve();
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
  list,
  load,
  save,
  isValid
};
