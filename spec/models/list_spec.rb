require 'rails_helper'

RSpec.describe List, type: :model do

  it { should belong_to(:user) }

  it { should have_valid(:list_name).when("Market Basket") }
  it { should_not have_valid(:list_name).when(nil, "") }

end
