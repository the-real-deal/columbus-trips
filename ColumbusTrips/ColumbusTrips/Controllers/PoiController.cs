using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColumbusTrips.Controllers
{
    public class PoiController
    {

        [HttpGet("poi-details")]
        public IEnumerable<PointsOfInterest> GetMyPois([FromQuery(Name = "id")] Guid id)
        {
            return MainController.context.PointsOfInterests.Where(p=>p.Id==id).ToList();
        }

        [HttpGet("my-pois")]
        public IEnumerable<PointsOfInterest> GetMyPois([FromQuery(Name = "username")] string username)
        {
            return MainController.context.Users.Where(u => u.Username == username).Include(u => u.PointsOfInterests).First().PointsOfInterests;
        }
    }
}
