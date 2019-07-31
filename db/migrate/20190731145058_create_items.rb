class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.belongs_to :list

      t.string :item_name, null: false, defualt: ""

      t.timestamps null: false
    end
  end
end
