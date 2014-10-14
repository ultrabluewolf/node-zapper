var debug = require('debug')('zapper');

var bodyParser = require('body-parser'),
  express = require('express'),
  app = express();

var config = require('yaml-config'),
  settings = config.readConfig('./config/settings.yaml');

var controllers = require('./src/controllers');


// setup
var PORT = settings.app.port;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({extended:true}) ); // to support URL-encoded bodies



controllers.set(app);


console.log("server started on port:",PORT);

app.listen(PORT);
