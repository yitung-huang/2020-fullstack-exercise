using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Uniti_Full_Stack_Development_Coding_Challenge.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumEmployees { get; set; }
        public string[] Tags { get; set; }
    }
}
