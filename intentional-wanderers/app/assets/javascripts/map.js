var initMap = function() {
    var lat = $('#map').data('initial-lat');
    var lng = $('#map').data('initial-lng');
    var map = L.map('map').setView([lat, lng], 11);
    var StamenWatercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    });
    StamenWatercolor.addTo(map);
    map.zoomControl.setPosition('bottomleft');
};

$(document).ready(initMap);
$(document).on('page:load', initMap);
