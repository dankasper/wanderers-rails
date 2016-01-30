class Photo < ActiveRecord::Base
  dragonfly_accessor :image do
    storage_options do |image|
      {
        path: "photos/#{SecureRandom.uuid}/#{image.name}"
      }
    end
  end
end
