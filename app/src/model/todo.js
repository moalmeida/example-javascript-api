'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({name: String, updated_at: Date});

module.exports = mongoose.model('Todo', todoSchema);
