'use strict';

let Todo = require('../service/todo');

const get = (req, res, next) => {
  return Todo.get().then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
};

module.exports = {
  get
};
