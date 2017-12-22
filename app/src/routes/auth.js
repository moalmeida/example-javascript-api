'use strict';

let jwt = require('jsonwebtoken');
let User = require('../service/user');
const token_seed = process.env.TOKEN_SEED || '_example';

const signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return next(new Error("invalid signup form"));
  }
  return User.save(username, password).then((data) => {
    res.status(201).json(data);
  }).catch(err => {
    next(err)
  })
};

const authenticate = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return next(new Error("invalid authenticate form"));
  }
  return User.load(username, password).then((data) => {
    if (data) {
      const payload = {
        username: data.local.username
      };
      const token = jwt.sign(payload, token_seed, {
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
