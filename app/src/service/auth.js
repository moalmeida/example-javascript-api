'use strict';

let crypt = require('../util/crypt');
let Auth = require('../model/auth');

const list = () => {
  return new Promise((resolve, reject) => {
    return Auth.find({}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const load = (username, password) => {
  return new Promise((resolve, reject) => {
    return Auth.findOne({
      'local.username': username
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data && data.local.username === username && crypt.validateHash(password, data.local.password)) {
        resolve(data);
      }
      reject();
    });
  });
};

const isValid = (username) => {
  return new Promise((resolve, reject) => {
    return Auth.findOne({
      'local.username': username
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data && data.local.username === username) {
        resolve(data);
      }
      reject(new Error("auth not found"));
    });
  });
};

const save = (body) => {
  let object = body;
  if (object && object.local) {
    object.local.password = crypt.generateHash(object.local.password)
  }
  return new Promise((resolve, reject) => {
    return Auth.create(object, (err, data) => {
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
