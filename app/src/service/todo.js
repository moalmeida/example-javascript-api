'use strict';

let Promise = require('bluebird');
let Todo = require('../model/todo');

const get = () => {
  return new Promise((resolve, reject) => {
    Todo.find({}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  get
};
