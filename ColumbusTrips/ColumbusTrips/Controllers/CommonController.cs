using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CommonController
    {
        [HttpGet("categories")]
        public IEnumerable<Category> GetCategories()
        {
            return MainController.context.Categories.ToList();
        }

    }
}
