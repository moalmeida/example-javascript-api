'use strict';

let passport = require("passport");
let jwt = require("passport-jwt");
let User = require('../model/user');

const init = () => {
  passport.use(new jwt.Strategy({
    secretOrKey: "_example",
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  }, (payload, cb) => {
    User.findOne({
      'local.username': payload.username
    }, (err, data) => {
      if (err) {
        return cb(err, null);
      }
      return cb(null, data);
    });
  }));
  return passport;
}

module.exports = {
  initialize: () => {
    return init().initialize();
  },
  session: () => {
    return init().session();
  },
  authenticate: () => {
    return init().authenticate("jwt", {session: false});
  }
};
