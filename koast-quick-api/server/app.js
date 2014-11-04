/*global require*/

'use strict';

var koast = require('koast');
var appSettings = {
  'app': {
    'indexHtml': 'path:../client/index.html',
    'portNumber': 8081,
    'routes': [{
      'route': '/api/v1',
      'type': 'module',
      'module': 'server/lib/api'
    }]
  },
  'databases': [{
    'host': '127.0.0.1',
    'port': '27017',
    'db': 'erg',
    'schemas': './server/schemas.js',
    'handle': '_'
  }]
};
koast.configure({
  appConfiguration: appSettings,
  force: true
});
koast.serve();
