'use strict';

let jwt = require('jsonwebtoken');
let User = require('../model/user');

const signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return next(new Error("invalid signup form"));
  }
  let user = new User({'local.username': username});
  user.local.password = user.generateHash(password);
  user.save((err, data) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(data);
    res.end();
  })
};

const authenticate = (req, res, next) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  User.findOne({
    'local.username': username
  }, (err, data) => {
    if (err) {
      return next(err);
    }
    if (data && data.local.username === username && data.validPassword(password, data.local.password)) {
      const payload = {
        username: data.local.username
      };
      const token = jwt.sign(payload, "_example", {
        expiresIn: 60 * 60
      });
      res.json({token, payload});
    } else {
      res.status(401).json({error: "user not found"});
    }
    res.end();
  });
};

// const onlyAuthenticated = (req, res) => {
//   res.json({message: "i'm on my way, it works!"});
//   res.end();
// };

module.exports = {
  signup,
  authenticate,
  // onlyAuthenticated
};
