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

  scope :published, -> { where(published: true) }
  scope :pending, -> { where(published: false) }

  after_save :publish_location, if: :published?

  def publish!
    self.published = true
    save!
  end

  def publish_location
    location.publish!
  end
end
