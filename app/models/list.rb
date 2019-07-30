class List < ApplicationRecord

  CATEGORIES = [
    "Fruit",
    "Vegetables",
    "Dairy",
    "Red Meat",
    "White Meat/ Poultry",
    "Seafood",
    "Grains",
    "Canned Foods",
    "Snacks",
    "Beverages",
    "Frozen",
    "Seasoning/ Spices",
    "Miscellaneous"
  ]

  belongs_to :user

  validates :list_name, presence: true
  validates :category,
    presence: true,
    inclusion: { in: CATEGORIES }
end
