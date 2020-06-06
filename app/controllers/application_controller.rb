class ApplicationController < ActionController::Base
  def encode_token(payload)
    JWT.encode(payload, 'i_think_some_banana_bread_would_be_nice')
  end
end
