/* global exports, require */

'use strict';

var koast = require('koast');
var koastRouter = koast.koastRouter;
var connection = koast.db.getConnectionNow();
var mapper = koast.mongoMapper.makeMapper(connection);

var defaults = {};

function isOwner(data, req) {
  if (req.user && req.user && req.user.data) {
    return data.owner === req.user.data.username;
  } else {
    return false;
  }
}

function annotator(item, req, res) {
  item.data.fullTitle = item.data.owner + ':' + item.data.description;
  item.meta.can = {
    edit: isOwner(item.data, req)
  };
  return item;
}

defaults.authorization = function defaultAuthorization(req, res) {

  return true;
};

mapper.options = {
  useEnvelope: false,
  queryDecorator: function () {},
  filter: function () {
    return true;
  },
  annotator: function () {}
};

var routes = [{
  method: 'get',
  route: 'tasks/',
  handler: mapper.get({
    model: 'tasks',
    annotator: annotator
  })
}, {
  method: 'get',
  route: 'tasks/:_id',
  handler: mapper.get({
    model: 'tasks'
  })
}, {
  method: 'post',
  route: 'tasks/',
  handler: mapper.post({
    model: 'tasks'
  })
}, {
  method: 'put',
  route: 'tasks/:_id',
  handler: mapper.put({
    model: 'tasks'
  })
}, {
  method: 'get',
  route: 'tasks-plus',
  handler: mapper.get({
    model: 'tasks',
    annotator: annotator,
    useEnvelope: true
  })
}];

module.exports = exports = {
  koastModule: {
    defaults: defaults,
    router: koastRouter(routes, defaults)
  }
}
