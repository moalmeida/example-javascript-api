/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

'use strict';

const PORT = process.env.PORT || 8888;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');

const app = require('./app');
// const auth = require('./util/auth');
const database = require('./util/database');
const todoRoute = require('./routes/todo');
const countRoute = require('./routes/count');
const authRoute = require('./routes/auth');
const healthcheckRoute = require('./routes/healthcheck');

app.get('/healthcheck', healthcheckRoute.get);
app.get('/todos', todoRoute.get);
app.get('/count/incremental', countRoute.incremental);
// app.get('/onlyauthenticated', auth.authenticate(), authRoute.onlyAuthenticated);
app.post('/authenticate', authRoute.authenticate);
app.post('/signup', authRoute.signup);

db_connect().on('error', (e) => {
  console.error(e);
}).on('disconnected', () => {
  return setTimeout(() => {
    db_connect();
  }, 1000);
}).once('open', () => {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    http.createServer(app).listen(PORT, (e) => {
      if (e) {
        console.error(e);
      }
    });
  }
});

function db_connect() {
  return database.instance().connection;
}
