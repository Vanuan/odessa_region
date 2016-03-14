var osmtogeojson = require('osmtogeojson');
var fs = require('fs');

function filterOut(geojson) {
  var filtered = JSON.parse(JSON.stringify(geojson));
  filtered.features = filtered.features.filter(function(f) {
    return f.geometry.type != "Point";
  });
  return filtered;
}

var filename = process.argv[2];
var geojson = JSON.parse(fs.readFileSync(filename));

var geojson = filterOut(geojson);

printOut(geojson);

function printOut(geojson) {
  process.stdout.write('{\n"type": "FeatureCollection",\n"features": [\n');
  geojson.features.forEach(function(f,i) {
  process.stdout.write(JSON.stringify(f, null, 4));
  if (i != geojson.features.length-1)
    process.stdout.write(',\n');
  });
  process.stdout.write('\n]\n}\n');
}

