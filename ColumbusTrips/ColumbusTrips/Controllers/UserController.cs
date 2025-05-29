using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController
    {
        [HttpGet(Name = "users")]
        public IEnumerable<User> Get()
        {
            var test = new Model.ColumbusTrips();
            var result = test.Users.Include(u => u.People).Where(u => u.IsActive == true);
            return result.ToArray(); // .Include(u => u.People)
        }
    }
}
