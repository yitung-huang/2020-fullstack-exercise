require 'yaml'
class Customer < ApplicationRecord
  file = YAML.load_file('exercise.yaml')

  customers = file["customers"]
  customers.each do | customer |
    Customer.create( customer_id: customer["id"], num_employees: customer["num_employees"], name: customer["name"], tags: customer["tags"] )
  end
end
