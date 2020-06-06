Rails.application.routes.draw do
  root 'pages#login'

  post "/", to: "auth#login"

  resources :users, only: [:create]
  resources :customers

end
