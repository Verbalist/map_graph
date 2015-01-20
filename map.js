/*function onMapClick() {
	graphLayer.getLayer(166).setStyle({        
        opacity: 0,
    });

}
*/
function init() {
	var req = $.ajax({
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

	//map.on('zommend', zoomDown);//zoomstart,zommend,zoomlevelschange,zoomIn(),zoomOut(),

	req.done(setGraph);

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

function setGraph(data){
	var graphEdges = [];
	edge = data;
	for(i in edge) {
		var latlon = [[parseFloat(edge[i].latlon1.split('/')[0]),parseFloat(edge[i].latlon1.split('/')[1])],
			[parseFloat(edge[i].latlon2.split('/')[0]),parseFloat(edge[i].latlon2.split('/')[1])]];
		var pl = new L.polyline(latlon,{color: 'red', opacity: 0});
		pl._leaflet_id = edge[i].id;
		graphEdges.push(pl);

	}
	graphLayer = L.layerGroup(graphEdges).addTo(map);
	map.on('zoomend',graphController);

}
