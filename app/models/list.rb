class List < ApplicationRecord

  belongs_to :user
  has_many :items

  validates :list_name, presence: true

end
