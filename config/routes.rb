Rails.application.routes.draw do
  root 'login#index'

  resources :customers

end
