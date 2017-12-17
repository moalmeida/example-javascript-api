'use strict';

let Todo = require('../service/todo');

const list = (req, res, next) => {
  return Todo.get().then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
};

const get = (req, res, next) => {
  return Todo.get().then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
};

const preload = (req, res, next) => {
  if (req.params.todoId) {
    Todo.findById(req.params.todoId, (err, data) => {
      req.todo = data;
      next();
    });
  } else {
    next();
  }
};

const put = (req, res, next) => {
  req.todo.set(req.body);
  req.todo.save((err, data) => {
    if (err) {
      next(err);
    }
    res.json(204, data);
  });
};

const post = (req, res, next) => {
  let todo = new Todo(req.body);
  todo.save((err, data) => {
    if (err) {
      next(err);
    }
    res.json(201, data);
  });
};

const del = (req, res, next) => {
  req.todo.remove((err) => {
    if (err) {
      next(err);
    }
    res.json(204, {});
  });
};

module.exports = {
  list,
  preload,
  get,
  put,
  post,
  del
};
