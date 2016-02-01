class Post < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :photos, through: :photo_layouts

  accepts_nested_attributes_for :photos
  accepts_nested_attributes_for :photo_layouts
end
