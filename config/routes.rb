Rails.application.routes.draw do
  root 'pages#login'
  # 
  # post "/login", to: "auth#login"
  #
  # resources :users, only: [:create]

  resources :customers

end
