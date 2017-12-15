'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  local: {
    username: {
      type: String,
      index: {
        unique: true
      },
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// userSchema.path('local.password').get(function (v) {
//   return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
// });

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = (arg0, arg1) => {
  return bcrypt.compareSync(arg0, arg1);
};

module.exports = mongoose.model('User', userSchema);
