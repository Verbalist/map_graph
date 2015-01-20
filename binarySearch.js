
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
