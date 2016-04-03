var osmtogeojson = require('osmtogeojson');
var fs = require('fs');

function filterRegion(feature) {
  var koatuu = "5100000000"; // Odesa
  var region_mod = 100000000;
  return (feature.properties.koatuu != undefined && (koatuu / 100000000 == Math.floor(feature.properties.koatuu / region_mod) && feature.properties.koatuu % region_mod != 0 )  );
}

function filterOut(geojson) {
  var filtered = JSON.parse(JSON.stringify(geojson));
  filtered.features = filtered.features.filter(function(f) {
    return f.geometry.type != "Point" && filterRegion(f);
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

