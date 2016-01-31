class RemovePostRefFromPhoto < ActiveRecord::Migration
  def change
    remove_reference :photos, :post, index: true, foreign_key: true
  end
end
