class AuthController < ApplicationController
  def login
    user = User.find_by(username: params[:auth][:username])

    if user && user.authenticate(params[:auth][:password])
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {jwt: token, success: "Welcome back, #{user.username}"}
    else
      render json: {failure: "Sorry, the login details you have entered is invalid."}
    end
  end
end
