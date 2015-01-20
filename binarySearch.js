function binarySearch(i,mas){
	var l = mas[0].id, r = mas[mas.length()].id;
	var c;
	while (l > r){
		c = mas[math.floor((r-l)/2)].id
		if (i >= c) l = c;
		else r = c;
	}
	return c;
}
