class AddLocationRefToPosts < ActiveRecord::Migration
  def change
    add_reference :posts, :location, index: true, foreign_key: true
  end
end
