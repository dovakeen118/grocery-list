require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::ListsController, type: :controller do
  let!(:user1){ FactoryBot.create(:user) }

  let!(:list1){ List.create(list_name: 'Market Basket', user: user1) }
  let!(:list2){ List.create(list_name: 'Whole Foods', user: user1) }

  describe "List show page" do
    it "Should return details about one list" do
      sign_in(user1)
      get :show, params: { id: list1.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)

    end
  end
end
