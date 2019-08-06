Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  resources :lists, only: [:index, :show, :edit]

  namespace :api do
    namespace :v1 do
      resources :lists, only: [:index, :show, :create, :update, :destroy] do
        resources :items, only: [:create, :update]
      end
    end
  end
end
