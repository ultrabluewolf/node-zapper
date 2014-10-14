
var config = require('yaml-config'),
  settings = config.readConfig('./config/settings.yaml');

var mongoose = require('mongoose');


var uri = 'mongodb://' + settings.mongo.host;
if (settings.mongo.port) {
  uri += ':' + settings.mongo.port;
}
uri += '/node-zapper';
var opts = {
  user: settings.mongo.username,
  pass: settings.mongo.password
};

mongoose.connect(uri,opts);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.connection;
