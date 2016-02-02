function slideshow(image) {
  $('#photo-slideshow').css('visibility', 'visible');
  var slider = $('.bxslider').bxSlider();
}

function closeSlideshow(event) {
  if ($(event.target).is('#photo-slideshow')) {
    $('#photo-slideshow').css('visibility', 'hidden');
  }
}
