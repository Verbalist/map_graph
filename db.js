var pg = require('pg');

function getDBClient(){
  var conString = "postgres://postgres:1111@localhost/graph";
  var client = new pg.Client(conString);
  return client;
}

function getJSON(SQLquery,resolve) {
  var client = getDBClient();
  var promise = new Promise(function(resolve,reject){

    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }

      client.query(SQLquery, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          client.end();
          resolve(JSON.stringify(result.rows,''));
        });
    });
  });
  promise.then(resolve);
};
exports.getJSON = getJSON;