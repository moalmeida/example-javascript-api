'use strict';

let Todo = require('../service/todo');

const list = (req, res, next) => {
  return Todo.list().then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
};

const preload = (req, res, next) => {
  if (req.params.todoId) {
    return Todo.findById(req.params.todoId).then((data) => {
      req.todo = data;
      next();
    }).catch((err) => {
      return next(err);
    });
  }
  res.json(400);
  res.end();
};

const get = (req, res) => {
  if (res.todo) {
    return res.json(200, res.todo);
  }
  res.json(400);
  res.end();
};

const put = (req, res, next) => {
  if (res.todo) {
    return Todo.update(res.todo, req.body).then((data) => {
      res.json(204, data);
    }).catch((err) => {
      return next(err);
    });
  }
  res.json(400);
  res.end();
};

const post = (req, res, next) => {
  const name = req.body.name;
  const object = {
    name: name
  }
  return Todo.save(object).then((data) => {
    res.json(201, data);
  }).catch((err) => {
    return next(err);
  });
};

const del = (req, res, next) => {
  if (res.todo) {
    return Todo.remove(res.todo).then(() => {
      res.status(204).end();
    }).catch((err) => {
      return next(err);
    });
  }
  res.json(400);
  res.end();
};

module.exports = {
  list,
  preload,
  get,
  put,
  post,
  del
};
