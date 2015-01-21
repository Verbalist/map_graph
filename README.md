# map_graph
Use leaflet.js и node.js

main file: index.js<br>
port: localhost:8080/<br>
map logic: map.js<br>
dbconnect: db.js<br>

SQLquery:
"select id,(select concat_ws('/',lat,lon) from nodes_test where id=srcid) as latlon1,(select concat_ws('/',lat,lon) from nodes_test where id=trgid) as latlon2,speed from edges_test"<br>

<img src='screanshot.png'>


