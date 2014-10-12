var ld = require('lodash');
var mongoose = require('mongoose');


var MappingSchema = mongoose.Schema({
  name: {type: String, unique: true},
  count: {type: Number, required: true},
  mappings: {type: Object, required: true}
});


var Mapping = mongoose.model('Mapping', MappingSchema);


var utils = {

  setCount: function (mapping_data) {
    mapping_data.count = ld.keys(mapping_data.mappings).length;
    return mapping_data;
  },

  copy: function (mapping,mapping_data) {
    utils.setCount(mapping_data);
    mapping.name = mapping_data.name;
    mapping.count = mapping_data.count;
    mapping.mappings = mapping_data.mappings;
  },

  init: function (mapping_data) {
    utils.setCount(mapping_data);
    return new Mapping(mapping_data);
  }

};



module.exports = {
  model: Mapping,
  utils: utils
};
