class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    if !defined?(auth)
      auth = {}
      auth[:user_id] = nil
    end
    @current_user ||= @current_user = User.find(auth[:user_id]) if auth && auth[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def encode_token(payload)
    JWT.encode(payload, 'i_think_some_banana_bread_would_be_nice')
  end
end
