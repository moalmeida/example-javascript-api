'use strict';

let Promise = require('bluebird');
let Todo = require('../model/todo');

const list = () => {
  return new Promise((resolve, reject) => {
    Todo.find({}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    Todo.findById(id, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const update = (todo, body) => {
  return new Promise((resolve, reject) => {
    todo.set(body);
    todo.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const remove = (todo) => {
  return new Promise((resolve, reject) => {
    todo.remove((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const save = (body) => {
  return new Promise((resolve, reject) => {
    let todo = new Todo(body);
    todo.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  list,
  findById,
  update,
  save,
  remove
};
