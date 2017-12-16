/* eslint no-console: ["error", { allow: ["log", "error"] }] */

'use strict';

module.exports = {
  debug: (message) => {
    console.log(message);
  },
  error: (message) => {
    console.error(message);
  }
};
