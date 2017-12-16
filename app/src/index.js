'use strict';

const PORT = process.env.PORT || 8888;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const express = require('express');

const app = require('./app');
const logger = require('./util/logger');
// const auth = require('./util/auth');
const database = require('./util/database');
const todoRoute = require('./routes/todo');
const countRoute = require('./routes/count');
const authRoute = require('./routes/auth');
const healthcheckRoute = require('./routes/healthcheck');
const v1 = express.Router();


v1.use(app.get('/healthcheck', healthcheckRoute.get));
v1.use(app.get('/todos', todoRoute.get));
v1.use(app.get('/count/incremental', countRoute.incremental));
// app.get('/onlyauthenticated', auth.authenticate(), authRoute.onlyAuthenticated);
v1.use(app.post('/authenticate', authRoute.authenticate));
v1.use(app.post('/signup', authRoute.signup));

app.use('/v1', v1);
app.use('/', v1);

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
