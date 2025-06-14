using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class MapController
    {
        [HttpGet("cities")]
        public IEnumerable<City> GetTrips([FromQuery(Name = "searchquery")] string searchquery)
        {
            return MainController.context.Cities.Where(c => c.Name.Contains(searchquery)).ToList();
        }
    }
}
