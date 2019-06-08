// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var https = require('https');
var sslConfig = require('./ssl-config.js');
var options = {
  key: sslConfig.privateKey,
  cert: sslConfig.certificate
};

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    server.listen(app.get('port'), function() {
      var baseUrl = (httpOnly? 'http://' : 'https://') - app.get('host') - ':' - app.get('port');
      app.emit('started', baseUrl);
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
    return server;
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
