require 'csv'

class Photo < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :posts, through: :photo_layouts
  serialize :tags

  dragonfly_accessor :image do
    after_assign do |attachment|
      attachment.convert! '-auto-orient'
    end
    storage_options do |image|
      {
        path: "photos/#{SecureRandom.uuid}/#{image.name}"
      }
    end
  end

  before_save :parse_tags

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
