class Post < ActiveRecord::Base
  belongs_to :location
  has_many :photo_layouts
  has_many :photos, through: :photo_layouts
end
