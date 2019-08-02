Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  resources :lists, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :lists, only: [:index, :show, :create] do
        resources :items, only: [:create]
      end
    end
  end
end
