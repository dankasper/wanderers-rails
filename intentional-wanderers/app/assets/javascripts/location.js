function Location(name, latitude, longitude, posts, photos) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.posts = posts;
    this.photos = photos;
}

Location.prototype.popupContent = function() {
    var photoTag = "", postTag = "";
    if (this.photos.length > 0) {
        photoTag =
            '<a href="' + this.photos[0].url + '">' +
                '<img src="' + this.photos[0].image + '"/>' +
            '</a>';
    }
    if (this.posts.length > 0) {
        postTag =
            '<a href="' + this.posts[0].url + '">' +
                '<p>' + this.posts[0].body + '</p>' +
            '</a>';
    }
    return [
        '<div class="location-popup">',
            '<h3>' + this.name + '</h3>',
            photoTag,
            postTag,
        '</div>'
    ].join("\n");
};       
