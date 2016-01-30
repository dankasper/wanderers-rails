class Post < ActiveRecord::Base
  has_many :photos
  belongs_to :location
end
