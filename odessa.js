/* global L */
/* global $ */
var map = L.map('map', {zoomSnap: 0});
var myLayer = L.geoJson().addTo(map);

$.getJSON("export.geojson", {
    "name:uk": "Одеса",
    "type": "boundary"
  }).done(function(json) {
    json.features = json.features.filter(function(feature, layer) {
      if (['Point', 'LineString'].indexOf(feature.geometry.type) != -1) {
        return false;
      }
      else {
        return true;
      }
    });
    var htmlProperties = function(properties) {
      var fieldsToShow = ['name', 'wikipedia', 'wikidata', 'koatuu'];
      var html = '';
      html += '<h3>' + properties['name'] + '</h3>';
      html += '<a target="_blank" href="http://data-gov-ua.org/dataset/koatuu">КОАТУУ</a> ' + properties['koatuu'] + '<br/>';
      html += '<a target="_blank" href="http://www.openstreetmap.org/' + properties['@id'] + '">OpenStreetMap</a>' + '<br/>';
      html += '<a target="_blank" href="https://www.wikipedia.org/wiki/' + properties['wikipedia'] + '">Вікіпедія</a>' + '<br/>';
      html += '<a target="_blank" href="https://www.wikidata.org/wiki/' + properties['wikidata'] + '">Вікідата</a>' + '<br/>';
      return html;
      return Object.keys(properties).filter(function(propertyName) {
        return fieldsToShow.indexOf(propertyName) != -1;
      }).map(function(propertyName) {
        var html;
        if (propertyName == 'name') {
          html = '<h1>' + properties[propertyName] + '</h1>'
        }
        if (propertyName == 'wikipedia') {
          html = '<a target="_blank" href="https://www.wikipedia.org/wiki/' + properties[propertyName] + '">Вікіпедія</a>';
        } else if (propertyName == 'wikidata') {
          html = '<a target="_blank" href="https://www.wikidata.org/wiki/' + properties[propertyName] + '">Вікідата</a>';
        } else if (propertyName == 'koatuu') {
        } else {
          html = propertyName + ': ' + properties[propertyName];
        }
        return html;
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
