var mapping = require('./mapping.js');

module.exports.set = function(app) {
  
  // your routes here
  app.get('/', function(req, res){
    res.send('Hello World!');
  });

  // let "mapping.js" set other routes
  mapping.set(app);
}
