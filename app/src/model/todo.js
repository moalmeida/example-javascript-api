'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
  name: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  updated_at: Date
});

module.exports = mongoose.model('Todo', todoSchema);
