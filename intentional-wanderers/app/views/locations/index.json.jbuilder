json.locations do
  json.array! @locations do |location|
    json.name location.name
    json.latitude location.latitude
    json.longitude location.longitude
    json.posts location.posts do |post|
      if post.body.length > 180
        json.body post.body[0..180] + '... (<span class="link">Read More</span>)'
      else
        json.body post.body
      end
      json.url post_path(post)
    end
    json.photos location.photos do |photo|
      json.image photo.image.url
      json.url photo_path(photo)
    end
  end
end
