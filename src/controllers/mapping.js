
var fs = require('fs');
var ld = require('lodash');

var conn = require('../../config').connection;

var Mapping = require('../../src/models').Mapping.model;
var MappingUtils = require('../../src/models').Mapping.utils;


// Mapping.find().exec(function (err,mappings) {
//   console.log('stat',mappings);
// });


module.exports.set = function(app) {
  // put more app route listings here
  

  app.get('/mapping', function (req, res) {

    Mapping.find().exec(function (err, mappings) {
      if (err) throw err;

      console.log(mappings);

      var data = {
        success: true,
        data: mappings
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data,null,"  "));

    });

    // fs.readFile('./tmp/mapping.json', 'utf-8', function (err, data) {

    //   if (err) throw err;
    //   console.log(data);
    //   data = JSON.parse(data);
    //   res.setHeader('Content-Type', 'application/json');
    //   res.send(JSON.stringify(data,null,"  "));

    // });

  });


  app.post('/mapping', function (req, res, next) {
    console.log("=>",req.body);

    var data = req.body;

    var query = {};

    if (data.id) {
      query._id = data.id;
    } else {
      query.name = data.name;
    }

    console.log('query:',query);

    Mapping.findOne(query).exec(function (err,mapping) {

      if (err) console.log(err);

      if (mapping) {
        console.log('copying');
        MappingUtils.copy(mapping,data);
      } else {
        mapping = MappingUtils.init(data);
      }

      console.log(mapping);
      mapping.save(function (err, mapping) {
        if (err) return console.error(err);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success: true, data: mapping},null,'  '));
      });

    });

    //var mapping = MappingUtils.init(data);
    

    //data.mappings = JSON.stringify(data.mappings,null,' ');

    // fs.writeFile('./tmp/mapping/' + data.name + '.json', data.mappings, function (err) {
    //   if (err) throw err;

    //   res.setHeader('Content-Type', 'application/json');
    //   res.send(JSON.stringify({success: true, test: req.body},null,'  '));
    // });

  });



  app.get('/mapping/:name', function (req, res, next) {
    console.log(req.params.name);

    Mapping.findOne({name: req.params.name}).exec(function (err,mapping) {

      if (err) throw err;
      console.log(data);
      //data = JSON.parse(data);
      
      if (!mapping) {
        mapping = {};
      }
      
      var data = {
        success: true,
        data: mapping
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data,null,"  "));

    });

    // fs.readFile('./tmp/mapping/' + req.params.id + '.json', 'utf-8', function (err, data) {

    //   if (err) throw err;
    //   console.log(data);
    //   data = JSON.parse(data);
    //   res.setHeader('Content-Type', 'application/json');
    //   res.send(JSON.stringify(data,null,"  "));

    // });

  });


  app.post('/mapping/:name', function (req,res,next) {

    var data = req.body;
    
    Mapping.findOne({name: req.params.name}).exec(function (err,mapping) {

      if (err) throw err;

      var result = {
        success: true,
        data: {
          value: mapping.mappings[data.value]
        }
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result,null,"  "));

    });


    // fs.readFile('./tmp/mapping/' + req.params.id + '.json', 'utf-8', function (err, mappings) {

    //   if (err) throw err;
    //   //console.log(mappings);
    //   mappings = JSON.parse(mappings);

    //   var result = {
    //     value: mappings[data.value]
    //   };

    //   if (result.value) {
    //     result.success = true;
    //   } 

    //   res.setHeader('Content-Type', 'application/json');
    //   res.send(JSON.stringify(result,null,"  "));

    // });

  });



}
