'use strict';

const PORT = process.env.PORT || 8888;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const version = require('express-semver-routing')({
  getVersion: (req) => req.get('accept-version') || '1.0.0'
})

const app = require('./app');
const logger = require('./util/logger');
// const auth = require('./util/auth');
const database = require('./util/database');
const todoRoute = require('./routes/todo');
const countRoute = require('./routes/count');
const authRoute = require('./routes/auth');
const healthcheckRoute = require('./routes/healthcheck');

app.get('/healthcheck', version('1.x.x'), healthcheckRoute.get);
app.get('/todos', version('1.x.x'), todoRoute.get);
app.get('/count/incremental', version('1.x.x'), countRoute.incremental);
// app.get('/onlyauthenticated', auth.authenticate(), authRoute.onlyAuthenticated);
app.post('/authenticate', version('1.x.x'), authRoute.authenticate);
app.post('/signup', version('1.x.x'), authRoute.signup);

db_connect().on('error', (e) => {
  logger.error(e);
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
        logger.error(e);
      }
    });
  }
});

function db_connect() {
  return database.instance().connection;
}
