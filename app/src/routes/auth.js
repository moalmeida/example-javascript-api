'use strict';

let jwt = require('jsonwebtoken');
let user = require('../service/user');

const signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return next(new Error("invalid signup form"));
  }
  return user.save(username, password).then((data) => {
    res.status(201).json(data);
  }).catch(err => {
    next(err)
  })
};

const authenticate = (req, res, next) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  return user.load(username, password).then((data) => {
    if (data) {
      const payload = {
        username: data.local.username
      };
      const token = jwt.sign(payload, "_example", {
        expiresIn: 60 * 60
      });
      res.json({token, payload});
    } else {
      res.status(401).end();
    }
  }).catch(err => {
    next(err)
  })
};

module.exports = {
  signup,
  authenticate
};
