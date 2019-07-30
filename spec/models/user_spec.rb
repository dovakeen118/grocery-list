require 'rails_helper'

RSpec.describe User, type: :model do

  it {should have_many(:lists) }

  it { should have_valid(:first_name).when("John") }
  it { should_not have_valid(:first_name).when(nil, "") }

  it { should have_valid(:last_name).when("Smith") }
  it { should_not have_valid(:last_name).when(nil, "") }

  it { should have_valid(:email).when("jsmith@email.com") }
  it { should_not have_valid(:email).when(nil, "") }

  it { should have_valid(:password).when("Password") }
  it { should_not have_valid(:password).when(nil, "") }

end
