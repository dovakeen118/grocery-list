Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  resources :lists, only: [:index, :show, :edit]

  namespace :api do
    namespace :v1 do
      resources :lists, only: [:index, :show, :create, :update] do
        resources :items, only: [:create]
      end
    end
  end
end
