json.locations do
  json.array! @locations do |location|
    json.name location.name
    json.latitude location.latitude
    json.longitude location.longitude
    json.posts location.posts do |post|
      json.body post.body
    end
    json.photos location.photos do |photo|
      json.image photo.image.url
    end
  end
end
