class AddPostAndLocationRefsToPhotos < ActiveRecord::Migration
  def change
    add_reference :photos, :post, index: true, foreign_key: true
    add_reference :photos, :location, index: true, foreign_key: true
  end
end
