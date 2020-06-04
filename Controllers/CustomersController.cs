using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Uniti_Full_Stack_Development_Coding_Challenge.Models;
using Uniti_Full_Stack_Development_Coding_Challenge.Services;

namespace Uniti_Full_Stack_Development_Coding_Challenge.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("ReactPolicy")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService customerService;
        public CustomerController(CustomerService customerService) {
            this.customerService = customerService;
        }

        // GET api/customers
        [HttpGet]
        public IEnumerable<Customer> Get() {
            return customerService.GetAll();
        }

        // GET api/customers/[id]
        [HttpGet("{id")]
        public async Task<IActionResult> Get(int id) {
            return Ok(customerService.GetById(id));
        }

        // POST api/customers
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customer customer) {
            return CreatedAtAction("Get", new { id = customer.Id }, customerService.Create(customer));
        }

        // PUT api/customers/[id]
        public async Task<IActionResult> Put(int id, [FromBody] Customer customer) {
            customerService.Update(id, customer);
            return NoContent();
        }

        // DELETE api/customers/[id]
        [HttpDelete("{id")]
        public async Task<IActionResult> Delete(int id) {
            customerService.Delete(id);
            return NoContent();
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
