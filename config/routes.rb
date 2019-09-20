Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  resources :about, only: [:index]
  resources :lists, only: [:index, :show, :edit]

  namespace :api do
    namespace :v1 do
      resources :lists, only: [:index, :show, :create, :update, :destroy] do
        resources :items, only: [:create, :update, :destroy]
      end
    end
  end
end
