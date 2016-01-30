class Photo < ActiveRecord::Base
  belongs_to :post
  belongs_to :location

  dragonfly_accessor :image do
    storage_options do |image|
      {
        path: "photos/#{SecureRandom.uuid}/#{image.name}"
      }
    end
  end
end
