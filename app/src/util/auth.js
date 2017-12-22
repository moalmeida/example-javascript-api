'use strict';

let passport = require("passport");
let jwt = require("passport-jwt");
const token_seed = process.env.TOKEN_SEED || '_example';

const init = () => {
  passport.use(new jwt.Strategy({
    secretOrKey: token_seed,
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
