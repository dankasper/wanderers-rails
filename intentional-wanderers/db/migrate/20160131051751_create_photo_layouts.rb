class CreatePhotoLayouts < ActiveRecord::Migration
  def change
    create_table :photo_layouts do |t|
      t.references :post, index: true, foreign_key: true
      t.references :photo, index: true, foreign_key: true
      t.integer :top
      t.string :align

      t.timestamps null: false
    end
  end
end
