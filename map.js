var ceilingSpeed = 60;
var stepSpeed = 10; 
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
	req.done(setGraph);

	//controls panel
	var info = L.control({position: 'topright'});

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	    this._div.innerHTML = '<h4>Step speed</h4><select id="speed">' +
	    	'<option value=5>5</option>' +
	    	'<option value=10 selected>10</option>' +
	    	'<option value=15>15</option>' +
	    	'<option value=15>20</option>' +
	    	'</select>km/h<br><br>';
	    var opt ='';
	    for (var i = 0;i<9;i++) {
	    	if (i*10 != ceilingSpeed) {
	    		var temp = '<option value='+(i*10).toString()+'>'+(i*10).toString()+'</option>';
	    	} else {
	    		var temp = '<option value='+(i*10).toString()+' selected>'+(i*10).toString()+'</option>';
	    	}
	    	opt+=temp;
	    }
	    this._div.innerHTML += '<h4>Ceiling speed </h4><select id="ceil">' +
	    	opt + '</select>km/h<br><br>';

	    return this._div;

	};
	info.addTo(map);
	$('#speed').on('click', function(e){
		stepSpeed = e.target.value;
		graphController();
	});
	$('#ceil').on('click', function(e){
		ceilingSpeed = e.target.value;
		graphController();
	});
	

}
function graphController(){
	for (var i in edge) {
		if ((edge[i].speed > (20-map.getZoom())*stepSpeed) || (edge[i].speed > ceilingSpeed)) {
			graphLayer.getLayer(edge[i].id).setStyle({opacity: 1});
		} else {
			graphLayer.getLayer(edge[i].id).setStyle({opacity: 0});
		} 
	}
}

function setGraph(data){
	var graphEdges = [];
	edge = data;
	for(var i in edge) {
		var latlon = [[parseFloat(edge[i].latlon1.split('/')[0]),parseFloat(edge[i].latlon1.split('/')[1])],
			[parseFloat(edge[i].latlon2.split('/')[0]),parseFloat(edge[i].latlon2.split('/')[1])]];
		var pl = new L.polyline(latlon,{color: 'red', opacity: 0});
		pl._leaflet_id = edge[i].id;
		graphEdges.push(pl);

	}
	graphLayer = L.layerGroup(graphEdges).addTo(map);
	map.on('zoomend',graphController);
	graphController();

}
