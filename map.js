//verbalist.l0489plc
//pk.eyJ1IjoidmVyYmFsaXN0IiwiYSI6ImZ6SzRkX1EifQ.sSjL8hPfra6tJQKByo4pcg
//sk.eyJ1IjoidmVyYmFsaXN0IiwiYSI6IkdYNDdhVncifQ.j5Pqv9g9DCLIuOTkzQhPSw
// initialize the map on the "map" div


function onMapClick(e) {
			//alert(map.getZoom());
		}

function init() {
	var req1 = $.ajax({
		url:'/node',
		dataType:'json',
	}).promise();

	var req2 = $.ajax({
		url:'/edge',
		dataType:'json',
	}).promise();

	var map = new L.Map('map').setView([50.43898, 30.48981], 10);

	var mapbox = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmVyYmFsaXN0IiwiYSI6ImZ6SzRkX1EifQ.sSjL8hPfra6tJQKByo4pcg', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'verbalist.l0489plc'
	}).addTo(map);
	map.on('zoomstart', onMapClick);//zoomstart,zommend,zoomlevelschange,zoomIn(),zoomOut(),
	var graphLayer = [];
	//var poliline = new L.polyline([[50.43616, 30.48633],[50.4363,30.48661]],{color: 'red'})//.addTo(map);
	var graph = $.when(req1,req2).done(function(node, edge){
		var node = node[0];
		var edge = edge[0];
		for(i in edge) {
			var latlng = [];
			for(j in node){
				if ((edge[i].srcid == node[j].id) || (edge[i].trgid == node[j].id)) {
					latlng.push([node[j].lat, node[j].lon]);
				}
			}
			graphLayer.push(new L.polyline(latlng,{color: 'red'}))
		}
	}).promise();
	graph.done(function(){
		var graphGroup = L.layerGroup(graphLayer).addTo(map);
		var baseLayer = {
			'Mapbox' :mapbox
		};
		var overlay = {
			'GraphGroup':graphGroup
		}
		L.control.layers(baseLayer,overlay).addTo(map);
	});

}

// create a marker in the given location and add it to the map
/*var marker = new L.Marker(new L.LatLng(51.5, -0.09));
map.addLayer(marker);

// attach a given HTML content to the marker and immediately open it
marker.bindPopup("A pretty CSS3 popup.<br />Easily customizable.").openPopup();
*/
//78384 3436334
