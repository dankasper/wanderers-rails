json.locations do
  json.array! @locations do |location|
    json.name location.name
    json.latitude location.latitude
    json.longitude location.longitude
  end
end
