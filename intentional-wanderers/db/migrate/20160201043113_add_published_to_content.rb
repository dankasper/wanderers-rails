class AddPublishedToContent < ActiveRecord::Migration
  def change
    add_column :posts, :published, :boolean
    add_column :photos, :published, :boolean
    add_column :locations, :published, :boolean
  end
end
