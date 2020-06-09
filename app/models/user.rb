require 'yaml'
class User < ApplicationRecord
  has_secure_password

  file = YAML.load_file('exercise.yaml')

  users = file["auth"]
  users.each do | user |
    User.create(username: user["username"], password: user["password"])
  end

  byebug
end
