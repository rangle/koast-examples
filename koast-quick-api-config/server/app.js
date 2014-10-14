/*global require*/

'use strict';

var koast = require('koast');
koast.configure()
  .then(function (config) {
    console.log('Config!', config);
  })
  .then(null, function (err) {
    console.log('error', err);
  });
koast.serve();
