require 'csv'

class Post < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :photos, through: :photo_layouts
  serialize :tags

  accepts_nested_attributes_for :photo_layouts

  scope :published, -> { where(published: true) }
  scope :pending, -> { where(published: false) }

  before_save :parse_tags
  after_save :publish_photos_and_location, if: :published?

  def publish!
    self.published = true
    save!
  end 

  def publish_photos_and_location
    photos.each &:publish!
    location.publish!
  end

  private

  def parse_tags
    if tags
      if tags.is_a?(String)
        self.tags = (CSV.parse_line(tags) || []).map &:strip
      end
    else
      self.tags = []
    end
  end
end
