class Photo < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :posts, through: :photo_layouts

  dragonfly_accessor :image do
    storage_options do |image|
      {
        path: "photos/#{SecureRandom.uuid}/#{image.name}"
      }
    end
  end
end
