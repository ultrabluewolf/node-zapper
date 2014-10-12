
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var controllers = require('./src/controllers');

// setup
var PORT = 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({extended:true}) ); // to support URL-encoded bodies

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies



controllers.set(app);



app.listen(PORT);
