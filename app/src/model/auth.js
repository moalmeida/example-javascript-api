'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authSchema = new Schema({
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

// authSchema.pre('save', (next) => {
//   console.log(this);
//   this.local.password = this.generateHash(this.local.password);
//   console.log(this);
//   next()
// })

// authSchema.path('local.password').get(function (v) {
//   return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
// });

// authSchema.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// authSchema.methods.validPassword = (arg0, arg1) => {
//   return bcrypt.compareSync(arg0, arg1);
// };

module.exports = mongoose.model('Auth', authSchema);
