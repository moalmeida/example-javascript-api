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
const auth = require('./util/auth');
const database = require('./util/database');
const todoRoute = require('./routes/todo');
const countRoute = require('./routes/count');
const authRoute = require('./routes/auth');
const healthcheckRoute = require('./routes/healthcheck');

app.get('/healthcheck', version('1.x.x'), healthcheckRoute.get);
app.post('/auth/authenticate', version('1.x.x'), authRoute.authenticate);
app.post('/auth/signup', version('1.x.x'), authRoute.signup);

app.get('/todos', version('1.x.x'), auth.authenticate(), todoRoute.list);
app.get('/todo/:todoId', version('1.x.x'), auth.authenticate(), todoRoute.preload, todoRoute.get);
app.put('/todo/:todoId', version('1.x.x'), auth.authenticate(), todoRoute.preload, todoRoute.put);
app.del('/todo/:todoId', version('1.x.x'), auth.authenticate(), todoRoute.preload, todoRoute.del);
app.post('/todo', version('1.x.x'), auth.authenticate(), todoRoute.post);
app.get('/count/incremental', version('1.x.x'), auth.authenticate(), countRoute.incremental);

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
