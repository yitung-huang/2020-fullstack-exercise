class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :customer_id
      t.string :name
      t.integer :num_employees
      t.string :tags, array: true

      t.timestamps
    end
  end
end
