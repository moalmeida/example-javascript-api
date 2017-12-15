'use strict';

let Promise = require('bluebird');
let Todo = require('../service/todo');
let Count = require('../service/count');

const get = (req, res) => {
  return Promise.join(Todo.get(), Count.incremental(), (todos, incremental) => {
    res.json({todos, incremental});
    res.end();
  });
};

module.exports = {
  get
};
