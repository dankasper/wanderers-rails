var setEditableElements = function() {
    $('.editable p').attr('contenteditable', 'true');
    $('.editable h2').attr('contenteditable', 'true');
};

$(document).ready(setEditableElements);
$(document).on('page:load', setEditableElements);

function storeInitialPhotoPosition(ev) {
    var target = $(ev.target);
    ev.dataTransfer.dropEffect = 'move';
    ev.dataTransfer.setData('application/json', JSON.stringify({
        'initialClientX': ev.clientX,
        'initialClientY': ev.clientY,
        'initialOffsetLeft': target.offset().left,
        'initialOffsetTop': target.offset().top,
        'initialWidth': target.width(),
        'initialHeight': target.height(),
        'imageSrc': target.attr('src'),
        'imageAlt': target.attr('alt'),
        'photoId': target.parents('.positioned-photo').attr('data-photo-id'),
        'layoutId': target.parents('.positioned-photo').attr('data-layout-id')
    }));
}

function calculateNewPhotoLayout(ev) {
    ev.preventDefault();
    var container = $(ev.target).parents('.post-body-container');
    var data = JSON.parse(ev.dataTransfer.getData('application/json'));
    var translateX = ev.clientX - data['initialClientX'];
    var translateY = ev.clientY - data['initialClientY'];
    var newOffsetTop = data['initialOffsetTop'] +  translateY;
    var newPaddingTop = newOffsetTop - container.offset().top;
    var newOffsetLeft = data['initialOffsetLeft'] + translateX;
    var newOffsetRight = newOffsetLeft + data['initialWidth']
    var newPaddingLeft = newOffsetLeft - container.offset().left;
    var newPaddingRight = container.offset().left + container.width() - newOffsetRight;
    var newAlignment, newAlignmentStyle;
    if (newPaddingLeft < 50) {
        newAlignment = 'left';
        newAlignmentStyle = 'float: left;'
    } else if (newPaddingRight < 50) {
        newAlignment = 'right';
        newAlignmentStyle = 'float: right;';
    } else {
        newAlignment = 'clear';
        newAlignmentStyle = 'float: left; width: 100%';
    }
    container.prepend([
        '<div class="positioned-photo" style="padding-top: ' + newPaddingTop + 'px; margin-bottom: -' + newPaddingTop + 'px;" data-alignment="' + newAlignment + '" data-offset-top="' + newPaddingTop + '" data-photo-id="' + data['photoId'] + '" data-layout-id="' + data['layoutId'] +'">',
            '<div style="' + newAlignmentStyle + '">',
                '<div style="margin: auto; width: ' + data['initialWidth'] + 'px; height: ' + data['initialHeight'] + 'px;">',
    		    '<img draggable="true" ondragstart="storeInitialPhotoPosition(event)" ondragend="destroyOriginalPhoto(event)" src="' + data['imageSrc'] + '" alt="' + data['imageAlt'] + '" style="margin: auto; width:' + data['initialWidth'] + 'px; height: ' + data['initialHeight'] +'px;"></img>',
                '</div>',
            '</div>',
        '</div>'
    ].join(""));
    $('.editable img').resizable({ aspectRatio: true });
}

function destroyOriginalPhoto(ev) {
    $(ev.target).parents('.positioned-photo').remove();
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
}

var configureDraggablePhotos = function() {
    $(".editable img").attr({
        'draggable': 'true',
        'ondragstart': 'storeInitialPhotoPosition(event)',
        'ondragend': 'destroyOriginalPhoto(event)'
    });
    $(".editable .post-body-container").attr({
        'ondrop': 'calculateNewPhotoLayout(event)',
        'ondragover': 'allowDrop(event)'
    });
    $(".editable img").resizable({ aspectRatio: true });
};

$(document).ready(configureDraggablePhotos);
$(document).on('page:load', configureDraggablePhotos);

function addToPost(photo) {
    $('.post-body-container').prepend([
        '<div class="positioned-photo" style="padding-top: 0px; margin-bottom: 0px;" data-alignment="left" data-offset-top="0" data-photo-id="' + $(photo).attr('data-photo-id') + '" data-layout-id="">',
            '<div style="float: left;">',
                '<img draggable="true" ondragstart="storeInitialPhotoPosition(event)" ondragend="destroyOriginalPhoto(event)" src="' + $(photo).attr('src') + '" alt="' + $(photo).attr('alt') + '" style="margin: auto; height: ' + $(photo).height() + 'px; width: ' + $(photo).width() + 'px;"></img>',
            '</div>',
        '</div>'
    ].join(""));
    $(".editable img").resizable({ aspectRatio: true });
}

function savePost(method, url, published) {
    $.ajax({
        type: method,
        url: url,
        data: {
            'post': {
                'title': $('.post-full-display h2').text(),
                'body': $('.post-body-container p').html(),
                'photo_layouts_attributes': $('.positioned-photo').get().map( function(photo) {
                    return {
                        'id': $(photo).attr('data-layout-id'),
                        'photo_id': $(photo).attr('data-photo-id'),
                        'top': $(photo).attr('data-offset-top'),
                        'align': $(photo).attr('data-alignment'),
                        'height': $(photo).find('img').height(),
                        'width': $(photo).find('img').width()
                    };
                }),
                'published': published,
                'tags': $('#tags').val()
            },
            'location': {
                'name': $('.location').text(),
                'latitude': $('#latitude').val(),
                'longitude': $('#longitude').val()
            }
        },
        success: function(data, textStatus) {
            if (data.redirect) {
                window.location.replace(data.redirect);
            } else {
                // drop edit from path to get show url
                url = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
                window.location.replace(url);
            }
        }
    });
}
