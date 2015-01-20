function onMapClick() {
	graphLayer.getLayer(166).setStyle({        
        opacity: 0,
    });
	/*for (key in graphLayer.getLayer(166)){
		alert(key)
	}*/
}

function init() {
	var req1 = $.ajax({
		url:'/node',
		dataType:'json',
	});

	var req2 = $.ajax({
		url:'/edge',
		dataType:'json',
	});	

	map = new L.Map('map').setView([50.44842, 30.48368], 10);

	var mapbox = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmVyYmFsaXN0IiwiYSI6ImZ6SzRkX1EifQ.sSjL8hPfra6tJQKByo4pcg', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'verbalist.l0489plc'
	}).addTo(map);

	map.on('zoomend',graphController);
	//map.on('zommend', zoomDown);//zoomstart,zommend,zoomlevelschange,zoomIn(),zoomOut(),

	graphEdges = [];
	$.when(req1,req2).done(setGraph).done(function(){
		 graphLayer = L.layerGroup(graphEdges).addTo(map);
		 alert('gj')

		/*var baseLayer = {
			'Mapbox' :mapbox
		};
		var overlay = {
			'graphLayer':graphLayer
		}
		L.control.layers(baseLayer,overlay).addTo(map);*/
		//graphController(map,graphEdges, graphLayer);
	});

}
function graphController(){
	for (i in edge) {
		if (edge[i].speed > (20-map.getZoom())*10) {
			graphLayer.getLayer(edge[i].id).setStyle({opacity: 1});
		} else {
			graphLayer.getLayer(edge[i].id).setStyle({opacity: 0});
		} 
	}
}

function setGraph(node, edges){
	var node = node[0];
	edge = edges[0];
	for(i in edge) {
		var latlng = [];
		for(j in node){
			if ((edge[i].srcid == node[j].id) || (edge[i].trgid == node[j].id)) {
				latlng.push([node[j].lat, node[j].lon]);
			}
		}
		var pl = new L.polyline(latlng,{color: 'blue', opacity: 0});
		pl._leaflet_id = edge[i].id;
		graphEdges.push(pl);
		//var start = binarySearch(edge[i].srcid,edge).promise();
		//var end = binarySearch(edge[i].trgid,edge).promise();
		//$.when(start,end).done(function(start,end){
		//	graphEdges.push(new L.polyline([[start.lat,start.lon],[end.lat,end.lon]],{color: 'red'}))
		//});
	}
}

function binarySearch(i,mas){
	var l = 0;
	var r = mas.length();
	var c;
	while (l < r){
		c = math.floor((r-l)/2)
		if (i >= mas[c].id) l = c;
		else r = c;
	}
	return mas[c];
}
