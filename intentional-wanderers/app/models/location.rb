class Location < ActiveRecord::Base
  has_many :posts
  has_many :photos

  scope :published, -> { where(published: true) }

  def publish!
    self.published = true
    save!
  end

  def ordered_content
    (posts + standalone_photos).sort_by { |content| content.created_at }.reverse
  end

  def standalone_photos
    photos.reject do |photo|
      posts.any? { |post| post.photos.include? photo }
    end
  end
end
