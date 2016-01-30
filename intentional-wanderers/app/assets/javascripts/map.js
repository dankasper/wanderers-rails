var addMarkers = function(map, locations) {
    locations.forEach(function(loc) {
        marker = L.marker([loc.latitude, loc.longitude]);
        if (loc.posts.length > 0 || loc.photos.length > 0) {
            marker.bindPopup(loc.popupContent());
        } else {
            marker.bindPopup(loc.name);
        }
        marker.addTo(map);
    });
};

var centerMap = function(map, loc) {
    map.setView([loc.latitude, loc.longitude], 6);
};

var initMap = function() {
    var lat = $('#map').data('initial-lat');
    var lng = $('#map').data('initial-lng');
    var map = L.map('map');
    var StamenWatercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    });
    StamenWatercolor.addTo(map);
    map.zoomControl.setPosition('bottomleft');
    $.ajax({ url: '/locations' })
        .done(function(data) {
            var locations = data['locations'].map( function(json) {
                return new Location(json['name'], json['latitude'], json['longitude'], json['posts'], json['photos']);
            });
            addMarkers(map, locations);
            centerMap(map, locations.slice(-1)[0]);
        });
};

$(document).ready(initMap);
$(document).on('page:load', initMap);
