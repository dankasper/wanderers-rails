function Location(name, latitude, longitude, orderedContent) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.orderedContent = orderedContent;
}

Location.prototype.postPopupContent = function(post) {
    var photoTag = "";
    if (post['photos'] && post['photos'].length > 0) {
        photoTag =
            '<a href="' + post['photos'][0].url + '">' +
                '<img src="' + post['photos'][0].image + '"/>' +
            '</a>';
    }
    var postTag =
            '<a href="' + post.url + '">' +
                '<p>' + post.body + '</p>' +
            '</a>';
    return ['<li>', photoTag, postTag, '</li>'].join("\n");
};

Location.prototype.photoPopupContent = function(photo) {
    var photoTag =
            '<a href="' + photo.url + '">' +
                '<img src="' + photo.image + '"/>' +
            '</a>';
    var captionTag;
    if (photo['caption']) {
        captionTag =
            '<a href="' + photo.url + '">' +
                '<p>' + photo['caption'] + '</p>' +
            '</a>';
    }
    return ['<li>', photoTag, captionTag, '</li>'].join("\n");
};

Location.prototype.popupContent = function() {
    var loc = this;
    var contentTags = loc.orderedContent.map(function(content) {
        if (content['type'] == 'post') {
            return loc.postPopupContent(content);
        } else if (content['type'] == 'photo') {
            return loc.photoPopupContent(content);
        }
    });
    return [
        '<div class="location-popup">',
            '<h3>' + loc.name + '</h3>',
            '<ul class="bxslider popup">',
                contentTags.join("\n"),
            '</ul>',
        '</div>'
    ].join("\n");
};

