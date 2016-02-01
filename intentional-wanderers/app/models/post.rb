class Post < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :photos, through: :photo_layouts

  accepts_nested_attributes_for :photo_layouts

  scope :published, -> { where(published: true) }

  after_save :publish_photos_and_location, if: :published?

  def publish!
    self.published = true
    save!
  end 

  def publish_photos_and_location
    photos.each &:publish!
    location.publish!
  end
end
