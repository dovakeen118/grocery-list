class Category < ApplicationRecord

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

  has_many :items

  validates :category,
    presence: true,
    inclusion: { in: CATEGORIES }

end
