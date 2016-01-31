var setEditableElements = function() {
    $('.editable p').attr('contenteditable', 'true');
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
        'initialOffsetWidth': target.width(),
        'imageSrc': target.attr('src'),
        'imageAlt': target.attr('alt')
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
    var newOffsetRight = newOffsetLeft + data['initialOffsetWidth']
    var newPaddingLeft = newOffsetLeft - container.offset().left;
    var newPaddingRight = container.offset().left + container.width() - newOffsetRight;
    var newAlignmentStyle;
    if (newPaddingLeft < 200 && newPaddingRight < 200) {
        newAlignmentStyle = 'float: left; width: 100%';
    } else if (newPaddingLeft < 200) {
        newAlignmentStyle = 'float: left;'
    } else if (newPaddingRight < 200) {
        newAlignmentStyle = 'float: right;';
    } else {
        return;
    }
    container.prepend([
        '<div class="positioned-photo" style="padding-top: ' + newPaddingTop + 'px; margin-bottom: -' + newPaddingTop + 'px;">',
            '<div style="' + newAlignmentStyle + '">',
                '<img draggable="true" ondragstart="storeInitialPhotoPosition(event)" ondragend="destroyOriginalPhoto(event)" src="' + data['imageSrc'] + '" alt="' + data['imageAlt'] + '" style="margin: auto;"></img>',
            '</div>',
        '</div>'
    ].join(""));
}

function destroyOriginalPhoto(ev) {
    $(ev.target).parent().parent().remove();
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
};

$(document).ready(configureDraggablePhotos);
$(document).on('page:load', configureDraggablePhotos);
