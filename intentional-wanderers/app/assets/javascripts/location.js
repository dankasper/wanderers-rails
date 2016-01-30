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
        photoTag = '<img src="' + this.photos[0].image + '"/>';
    }
    if (this.posts.length > 0) {
        postTag = '<p>' + this.posts[0].body;
    }
    return [
        '<div class="location-popup">',
            '<h3>' + this.name + '</h3>',
            photoTag,
            postTag,
        '</div>'
    ].join("\n");
};       
