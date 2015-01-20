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

function json(response) {
  console.log("Request handler 'json' was called.");
  response.writeHead(200, {"Content-Type": "application/json"});
  var SQLquery = "select id,(select concat_ws('/',lat,lon) from nodes_test where id=srcid) as latlon1,(select concat_ws('/',lat,lon) from nodes_test where id=trgid) as latlon2,speed from edges_test";
  var a = db.getJSON(SQLquery,function(value){
    response.write(value);
    response.end();
  });
}

exports.start = start;
exports.json = json;

