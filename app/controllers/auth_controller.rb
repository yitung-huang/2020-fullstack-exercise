class AuthController < ApplicationController
  def login
    user = User.find_by(username: params[:auth][:username])

    if user && user.authenticate(params[:auth][:password])
      payload = {user_id: user.id}
      token = encode_token(payload)

      session[:user_id] = user.id
      session[:jwt_token] = token
      session[:error] = nil

      # Not sure where to return JWT to?
      # render json: {jwt: token, success: "Welcome back, #{user.username}"}
      redirect_to customers_path
    else
      session[:user_id] = nil
      session[:jwt_token] = nil
      session[:error] = "Sorry, the login details you have entered is invalid."
      redirect_to root_path
    end
  end

  def destroy
    session[:user_id] = nil
    session[:jwt_token] = nil
    session[:error] = nil
  end

end
