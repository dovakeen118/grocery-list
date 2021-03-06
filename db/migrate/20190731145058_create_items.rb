class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.belongs_to :list, null: false

      t.string :item_name, null: false, defualt: ""
      t.string :category, null: false, default: ""
      t.float :quantity, default: 1
      t.string :measurement, default: ""
      t.string :aisle, default: ""
      t.integer :price, default: 0

      t.timestamps null: false
    end
  end
end
