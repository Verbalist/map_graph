var fs = require('fs')
var db = require('./db')

function start(response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('index.html', function (err, logData) {
    if (err) throw err;
    var text = logData.toString();
    response.write(text);
    response.end();

  });
}

function json(response,pathname) {
  console.log("Request handler 'json' was called.");
  response.writeHead(200, {"Content-Type": "application/json"});
  if (pathname == '/edge') 
    var SQLquery = 'SELECT ID,SRCID,TRGID,SPEED FROM EDGES_TEST;';
  else
    var SQLquery = 'SELECT ID,LAT, LON FROM NODES_TEST;';
  var a = db.getJSON(SQLquery,function(value){
    response.write(value);
    response.end();
  });
}

exports.start = start;
exports.json = json;

