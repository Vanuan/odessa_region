var fs = require('fs');

function validate(osm_json) {
  if (osm_json.osm3s.timestamp_osm_base != osm_json.osm3s.timestamp_areas_base) {
    console.error('OSM and area timestamps don\'t match!');
    process.exit(1)
  }
}

var filename = process.argv[2];
var json = JSON.parse(fs.readFileSync(filename));

validate(json);

