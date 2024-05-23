#!/usr/bin/env node

import * as fs from "node:fs";

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('file-upload-api:server');
var http = require('http');
var https = require('https');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.API_PORT || '3001');
var httpsPort = normalizePort(process.env.HTTPS_PORT || '443');


if (process.env.NODE_ENV === 'production') {
  app.set('port', httpsPort);
  var httpsServer = https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
}, app);
  httpsServer.listen(httpsPort);
} else {
  var server = http.createServer(app);
  app.set('port', port);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
