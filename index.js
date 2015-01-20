var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/node"] = requestHandlers.json;
handle["/edge"] = requestHandlers.json;	

server.start(router.route, handle);