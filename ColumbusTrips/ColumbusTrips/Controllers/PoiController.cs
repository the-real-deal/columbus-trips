using ColumbusTrips.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColumbusTrips.Controllers
{
    public class PoiController
    {

        [HttpGet("poi-details")]
        [ProducesResponseType<PointsOfInterest>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPoiDetails([FromQuery(Name = "id")] Guid id)
        {
            var query = MainController.context.PointsOfInterests
                .AsNoTracking()
                .Include(poi => poi.Reviews)
                .Include(poi => poi.PoiThemes)
                .Include(poi => poi.Activities).ThenInclude(a => a.Categories)
                .Include(poi => poi.LocationNavigation)
                .AsSplitQuery().SingleOrDefault(poi => poi.Id == id);
            return new OkObjectResult(query);
        }

        [HttpGet("my-pois")]
        public IEnumerable<PointsOfInterest> GetMyPois([FromQuery(Name = "username")] string username)
        {
            return MainController.context.Users.Where(u => u.Username == username).Include(u => u.PointsOfInterests).ThenInclude(p => p.PoiThemes).
                Include(u => u.PointsOfInterests).ThenInclude(p => p.Activities).ThenInclude(a => a.Categories).
                Include(u=>u.PointsOfInterests).ThenInclude(u=>u.Reviews).
                Include(u => u.PointsOfInterests).ThenInclude(u => u.LocationNavigation).
                First().PointsOfInterests;
        }

        [HttpGet("activity-details")]
        [ProducesResponseType<PointsOfInterest>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetActivityDetails([FromQuery(Name = "activityid")] Guid id)
        {
            var act = MainController.context.Activities.Include(a=>a.Categories).SingleOrDefault(u=>u.Id == id);
            if (act == null) return new NotFoundResult();
            return new OkObjectResult(act);
        }

        [HttpGet("{id}")]
        [ProducesResponseType<PointsOfInterest>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPoi(Guid poiID)
        {
            var query = MainController.context.PointsOfInterests.Where(poi => poi.Id == poiID);
            if (query.Count() == 0)
                return new NotFoundResult();
            return new OkObjectResult(query.Include(p => p.Activities).Include(p => p.PoiThemes).Include(p => p.Reviews).FirstOrDefault());
        }
    }
}
