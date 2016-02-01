class Location < ActiveRecord::Base
  has_many :posts
  has_many :photos

  scope :published, -> { where(published: true) }

  def publish!
    self.published = true
    save!
  end
end
