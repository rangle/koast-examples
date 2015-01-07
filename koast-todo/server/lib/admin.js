/* global exports, require */


var admin = require('koast').admin;
var adminConfig = {
  aws: {
    key: process.env.AWS_ACCESS,
    secret: process.env.AWS_SECRET
  },

  backups: {
    target: 'mongodb://localhost:27017/koast-to-do-application', //Database to backup
  },

  database: { //Database usennpd to store admin metadata
    url: 'mongodb://localhost:27017/koast_db'
  }
};

var adminModule = admin.genKoastModule(adminConfig);

module.exports = exports = {
  koastModule: adminModule
}
