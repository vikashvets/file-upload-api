#!/usr/bin/env node
import * as fs from "node:fs";
import {Server} from "https";
const app = require('../app');
const debug = require('debug')('file-upload-api:server');
const http = require('http');
const https = require('https');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.API_PORT || '3001');
const httpsPort = normalizePort(process.env.HTTPS_PORT || '443');

let server: Server;
if (process.env.NODE_ENV === 'production') {
  app.set('port', httpsPort);
  server = https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
}, app);
  server.listen(httpsPort);
} else {
  server = http.createServer(app);
  app.set('port', port);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

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

  const bind = typeof port === 'string'
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
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}
