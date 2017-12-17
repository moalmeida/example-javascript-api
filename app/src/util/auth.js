'use strict';

let passport = require("passport");
let jwt = require("passport-jwt");

const init = () => {
  passport.use(new jwt.Strategy({
    secretOrKey: "_example",
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  }, (payload, cb) => {
    return cb(null, payload);
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
