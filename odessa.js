/* global L */
/* global $ */
var map = L.map('map');
var myLayer = L.geoJson().addTo(map);

$.getJSON("export.geojson", {
    "name:uk": "Одеса",
    "type": "boundary"
  }).done(function(json) {
    json.features = json.features.filter(function(feature, layer) {
      if (feature.geometry.type == "Point") {
        return false;
      }
      else {
        return true;
      }
    });
    var htmlProperties = function(properties) {
      var fieldsToShow = ['name', 'wikipedia', 'koatuu'];

      return Object.keys(properties).filter(function(propertyName) {
        return fieldsToShow.indexOf(propertyName) != -1;
      }).map(function(propertyName) {
        if (propertyName == 'wikipedia') {
          return '<a target="_blank" href="https://www.wikipedia.org/wiki/' + properties[propertyName] + '"> wikipedia <a>';
        }
        return propertyName + ': ' + properties[propertyName];
      }).join('<br/>');
    };

    var geojson = L.geoJson(json, {
      onEachFeature: function(feature, layer) {
          var popupHtmlContent = htmlProperties(feature.properties);
          layer.bindPopup(popupHtmlContent);
      }
    });
    geojson.addTo(map);


    myLayer.addData(json);
    map.fitBounds(myLayer.getBounds());
  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });