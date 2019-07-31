require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::ListsController, type: :controller do
  let!(:user1){ FactoryBot.create(:user) }
  let!(:user2){User.create(
    first_name: "Sarah",
    last_name: "Davis",
    email: "sdavis@email.com",
    password: "password"
  )}

  let!(:list1){ List.create(list_name: 'Market Basket', user: user1) }
  let!(:list2){ List.create(list_name: 'Whole Foods', user: user1) }
  let!(:list3){ List.create(list_name: 'Trader Joes', user: user2) }

  describe "List index page" do
    it "Should return all lists for the current user" do
      sign_in(user1)
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(2)
      expect(returned_json["lists"][0]["list_name"]).to eq("Market Basket")
      expect(returned_json["lists"][1]["list_name"]).to eq("Whole Foods")
    end
  end

  describe "List show page" do
    it "Should return details about one list" do
      sign_in(user1)
      get :show, params: { id: list1.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)

    end
  end

  describe "Create and post a new list" do
    let!(:new_list_object){
      {
        list_name: 'Stop and Shop',
        user: user2
      }
    }

    it "Should add a new list to the database" do
      sign_in(user2)
      expect{
        post :create,
        params: {
          list: new_list_object
        }
      }.to change { List.count }.by 1
    end
  end
end
