class AddHeightAndWidthToPhotoLayout < ActiveRecord::Migration
  def change
    add_column :photo_layouts, :height, :integer
    add_column :photo_layouts, :width, :integer
  end
end
