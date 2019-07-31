class Item < ApplicationRecord

  belongs_to :list

  validates :item_name, presence: true
  
end
