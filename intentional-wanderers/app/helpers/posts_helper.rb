module PostsHelper
  def positioned_photo_tag photo_layout
    content_tag :div, { class: 'positioned-photo', style: "padding-top: #{photo_layout.top}px; margin-bottom: #{-photo_layout.top}px;", data: { layout_id: photo_layout.id, photo_id: photo_layout.photo_id, offset_top: photo_layout.top, alignment: photo_layout.align, caption: photo_layout.photo.caption } } do
      if photo_layout.align == 'clear'
        content_tag :div, { style: 'float: left; width: 100%;' } do
          content_tag :div, { style: "margin: auto; width: #{photo_layout.width}px;" } do
            image_tag(photo_layout.photo.image.thumb('2000x>').url, style: "margin: auto; height: #{photo_layout.height}px; width: #{photo_layout.width}px;") +
            content_tag(:p, photo_layout.photo.caption)
          end
        end
      else
        content_tag :div, { style: "float: #{photo_layout.align}" } do
          image_tag(photo_layout.photo.image.thumb('2000x>').url, style: "margin: auto; height: #{photo_layout.height}px; width: #{photo_layout.width}px") +
          content_tag(:p, photo_layout.photo.caption)
        end
      end
    end
  end
end
