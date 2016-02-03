var slider;

$(document).ready(function() {
  slider = $('.bxslider').bxSlider();
});
$(document).on('page:load', function() {
  slider = $('.bxslider').bxSlider();
});

function slideshow(image) {
  $('#photo-slideshow').css('visibility', 'visible');
  slider.reloadSlider({ startSlide: $('#photo-list img').get().indexOf(image) });
}

function closeSlideshow(event) {
  if ($(event.target).is('#photo-slideshow')) {
    $('#photo-slideshow').css('visibility', 'hidden');
  }
}
