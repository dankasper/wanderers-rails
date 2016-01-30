var addMarkers = function(map, locations) {
    locations.forEach(function(loc) {
        L.marker([loc['latitude'], loc['longitude']]).addTo(map);
    });
};

var centerMap = function(map, loc) {
    map.setView([loc['latitude'], loc['longitude']], 6);
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
            addMarkers(map, data['locations']);
            centerMap(map, data['locations'].slice(-1)[0]);
        });
};

$(document).ready(initMap);
$(document).on('page:load', initMap);
