using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Uniti_Full_Stack_Development_Coding_Challenge.Models;

namespace Uniti_Full_Stack_Development_Coding_Challenge.Services
{
    public class CustomerService
    {
        private static List<Customer> customers = new List<Customer>();
        private static int Count = 1;

        static CustomerService() {}

        public List<Customer> GetAll() {
            return customers;
        }
        
        public Customer GetById(int id) {
            return customers.Where(customer => customer.Id == id).FirstOrDefault();
        }

        public Customer Create(Customer customer) {
            customer.Id = Count++;
            customers.Add(customer);
            return customer;
        }

        public void Update(int id, Customer customer) {
            Customer found = customers.Where(n => n.Id == id).FirstOrDefault();
            found.Name = customer.Name;
            found.NumEmployees = customer.NumEmployees;
            found.Tags = customer.Tags;
        }

        public void Delete(int id) {
            customers.RemoveAll(n => n.Id == id);
        }
    }
}
