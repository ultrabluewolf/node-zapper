var debug = require('debug')('zapper:mapping:controller');

var fs = require('fs');
var ld = require('lodash');

var conn = require('../../config').connection;

var Mapping = require('../../src/models').Mapping.model;
var MappingUtils = require('../../src/models').Mapping.utils;


// Mapping.find().exec(function (err,mappings) {
//   console.log('stat',mappings);
// });


module.exports.set = function(app) {
  

  app.get('/mapping', function (req, res) {

    Mapping.find().exec(function (err, mappings) {
      if (err) {
        debug(err);
        res.status(500).json({success:false});
        return;
      }

      var data = {
        success: true,
        data: mappings
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data,null,"  "));

    });


  });


  app.post('/mapping', function (req, res, next) {
    
    var data = req.body;

    var query = {};

    if (data.id) {
      query._id = data.id;
    } else {
      query.name = data.name;
    }

    
    Mapping.findOne(query).exec(function (err,mapping) {

      if (err) {
        debug(err);
        res.status(500).json({success:false});
        return;
      }

      if (mapping) {
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


  });



  app.get('/mapping/:name', function (req, res, next) {
    
    Mapping.findOne({name: req.params.name}).exec(function (err,mapping) {

      if (err) {
        debug(err);
        res.status(500).json({success:false});
        return;
      }
      
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


  });


  app.post('/mapping/:name', function (req,res,next) {

    var data = req.body;
    
    Mapping.findOne({name: req.params.name}).exec(function (err,mapping) {

      if (err) {
        debug(err);
        res.status(500).json({success:false});
        return;
      }

      var result = {
        success: true,
        data: {
          value: mapping.mappings[data.value]
        }
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result,null,"  "));

    });


  });



}
