json.extract! customer, :id, :username, :num_employees, :created_at, :updated_at
json.url customer_url(customer, format: :json)
