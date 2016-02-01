module PostsHelper
  def positioned_photo_tag photo_layout
    content_tag :div, { class: 'positioned-photo', style: "padding-top: #{photo_layout.top}px; margin-bottom: -#{photo_layout.top}px;", data: { layout_id: photo_layout.id, photo_id: photo_layout.photo_id } } do
      if photo_layout.align == 'clear'
        content_tag :div, { style: 'float: left; width: 100%;' } do
          image_tag photo_layout.photo.image.url, style: "margin: auto; height: #{photo_layout.height}px; width: #{photo_layout.width}px;"
        end
      else
        content_tag :div, { style: "float: #{photo_layout.align}" } do
          image_tag photo_layout.photo.image.url, style: "margin: auto; height: #{photo_layout.height}px; width: #{photo_layout.width}px"
        end
      end
    end
  end
end
