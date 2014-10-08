/* global require */

'use strict';

var koast = require('koast');
var koastRouter = koast.koastRouter;
var connection = koast.db.getConnectionNow();
var mapper = koast.mongoMapper.makeMapper(connection);

var defaults = {
  authorization: function (req, res) {
    return true;
  }
};

mapper.options.useEnvelope = false;

var routes = [{
  method: 'get',
  route: 'tasks',
  handler: mapper.get({
    model: 'tasks'
  })
}, {
  method: ['get', 'put', 'post', 'delete'],
  route: 'tasks/:_id',
  handler: mapper.auto({
    model: 'tasks'
  })
}];

module.exports = exports = {
  koastModule: {
    defaults: defaults,
    router: koastRouter(routes, defaults)
  }
};
