json.locations do
  json.array! @locations do |location|
    json.name location.name
    json.latitude location.latitude
    json.longitude location.longitude
    json.orderedContent location.ordered_content do |content|
      if content.is_a?(Post)
        json.title content.title
        if content.body.length > 180
          json.body content.body[0..180] + '... (<span class="link">Read More</span>)'
        else
          json.body content.body
        end
        json.url post_path(content)
        json.photos content.photos do |photo|
          json.url photo_path(photo)
          json.image photo.image.url
        end
        json.type 'post'
      elsif content.is_a?(Photo)
        json.image content.image.url
        json.url photo_path(content)
        json.caption content.caption
        json.type 'photo'
      end
    end
  end
end
