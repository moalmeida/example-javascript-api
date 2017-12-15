'use strict';

let Count = require('../service/count');

const incremental = (req, res, next) => {
  return Count.incremental().then((data) => {
    res.json(data);
    res.end();
  }).catch((err) => {
    return next(err);
  })
};

module.exports = {
  incremental
};
