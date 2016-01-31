module PostsHelper
  def positioned_photo_tag photo_layout
    content_tag :div, { class: 'positioned-photo', style: "padding-top: #{photo_layout.top}px; margin-bottom: -#{photo_layout.top}px;" } do
      if photo_layout.align == 'clear'
        content_tag :div, { style: 'float: left; width: 100%;' } do
          image_tag photo_layout.photo.image.url, style: 'margin: auto'
        end
      else
        image_tag photo_layout.photo.image.url, style: "float: #{photo_layout.align};"
      end
    end
  end
end
