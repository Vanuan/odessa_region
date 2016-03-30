#!/bin/sh
set -e
wget http://overpass.osm.rambler.ru/cgi/interpreter?data=%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0Aarea\(3600072634\)-%3E.searchArea%3B%0A\(%0A%20%20relation%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%224%22%5D\(area.searchArea\)%3B%0A%20%20relation%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%226%22%5D\(area.searchArea\)%3B%0A\)%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B \
-O ./files/export.json
./node_modules/.bin/osmtogeojson ./files/export.json > ./files/export_orig.geojson
node ./process_areas.js ./files/export_orig.geojson > ./files/export_filtered.geojson
./node_modules/.bin/mapshaper -i ./files/export_filtered.geojson -simplify interval=400 stats -o ./files/export.geojson
