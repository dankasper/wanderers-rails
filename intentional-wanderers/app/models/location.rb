class Location < ActiveRecord::Base
  has_many :posts
  has_many :photos

  scope :published, -> { where(published: true) }

  def publish!
    self.published = true
    save!
  end

  def ordered_content
    (posts + photos).sort_by { |content| content.created_at }.reverse
  end
end
