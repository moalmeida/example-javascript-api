'use strict';

let Todo = require('../service/todo');

const list = (req, res, next) => {
  return Todo.list().then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
};

const get = (req, res) => {
  if (res.todo) {
    res.json(res.todo);
  }
  res.status(404).end()
};

const preload = (req, res, next) => {
  if (req.params.todoId) {
    return Todo.findById(req.params.todoId).then((data) => {
      req.todo = data;
      next();
    }).catch((err) => {
      return next(err);
    });
  } else {
    next();
  }
};

const put = (req, res, next) => {
  if (res.todo) {
    return Todo.update(res.todo, req.body).then((data) => {
      res.json(204, data);
    }).catch((err) => {
      return next(err);
    });
  }
  res.status(404).end()
};

const post = (req, res, next) => {
  return Todo.save(req.body).then((data) => {
    res.json(201, data);
  }).catch((err) => {
    return next(err);
  });
};

const del = (req, res, next) => {
  if (res.todo) {
    return Todo.remove(res.todo).then(() => {
      res.json(204, {});
    }).catch((err) => {
      return next(err);
    });
  }
  res.status(404).end()
};

module.exports = {
  list,
  preload,
  get,
  put,
  post,
  del
};
