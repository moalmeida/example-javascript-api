'use strict';

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

const update = (object, body) => {
  return new Promise((resolve, reject) => {
    object.set(body);
    object.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const save = (body) => {
  return new Promise((resolve, reject) => {
    Todo.create(body, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const remove = (object) => {
  return new Promise((resolve, reject) => {
    object.remove((err) => {
      if (err) {
        reject(err);
      }
      resolve();
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
