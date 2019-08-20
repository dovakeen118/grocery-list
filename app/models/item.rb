class Item < ApplicationRecord
  CATEGORIES = [
    "Fruit",
    "Vegetables",
    "Dairy",
    "Grains",
    "White Meat/ Poultry",
    "Red Meat",
    "Seafood",
    "Legumes/ Nuts",
    "Snacks",
    "Herbs/ Seasoning/ Spices",
    "Beverages",
    "Canned Food",
    "Frozen",
    "Household",
    "Miscellaneous"
  ]

  MEASUREMENTS = [
    "Box",
    "Can",
    "Cup",
    "Dozen",
    "Gallon",
    "Ounce",
    "Package",
    "Pint",
    "Pound",
    "Quart"
  ]

  belongs_to :list

  validates :item_name, presence: true
  validates :category,
    presence: true,
    inclusion: { in: CATEGORIES }
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }

end
