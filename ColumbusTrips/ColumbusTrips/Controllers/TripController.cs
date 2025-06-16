using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TripController
    {
        
        [HttpGet("my-trips")]
        public IEnumerable<Trip> GetTrips([FromQuery(Name = "username")] string username)
        {
            
            var trips = MainController.context.Trips.FromSqlInterpolated($"select * from Trips where UserID={username} or GroupID in (select GroupID from Memberships where UserID={username})");

            return trips;
        }

        [HttpGet("trip-details")]
        [ProducesResponseType<Trip>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetTripDetails([FromQuery(Name = "tripID")] Guid tripID)
        {
            var query = MainController.context.Trips
                .AsNoTracking()                    // lettura = niente change‑tracking
                .Include(t => t.Reviews)           // include solo ciò che serve
                .Include(t => t.Itineraries)
                    .ThenInclude(i => i.PointOfInterest)
                        .ThenInclude(p => p.LocationNavigation)
                .Include(t => t.Itineraries)
                    .ThenInclude(i => i.PointOfInterest)
                        .ThenInclude(p => p.PoiThemes)
                .Include(t => t.Itineraries)
                    .ThenInclude(i => i.PointOfInterest)
                        .ThenInclude(p => p.Activities)
                            .ThenInclude(a => a.Categories)
                .AsSplitQuery().SingleOrDefault(t => t.Id == tripID);
            if (query == null) return new NotFoundResult();

            return new OkObjectResult(query);
        }

        [HttpGet("trip/{id}")]
        [ProducesResponseType<Review>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetTrip(Guid id)
        {
            var review = MainController.context.Trips.FirstOrDefault(review => review.Id == id);
            if (review == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(review);
        }

        [HttpGet("public-itineraries")]
        public  IEnumerable<Trip> GetAllPublicTrips()
        {
            return MainController.context.Trips.Where(t=>t.IsPublic).ToList();
        }

        public class InputTrip
        {
            public string Name { get; set; } = null!;
            public string Description { get; set; } = null!;
            public string TripType { get; set; } = null!;
            public bool IsPublic { get; set; }
            public int? SuggestedUsersNumber { get; set; }
            public Guid? GroupId { get; set; }
            public string? UserId { get; set; }
        }

        [HttpPost("new-user-trip")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateUserTrip(InputTrip trip)
        {
            if (trip.UserId == null || trip.GroupId!=null)
                return new BadRequestResult();

            var newTrip=CreateNewTrip(trip);
            MainController.context.Trips.Add(newTrip);
            MainController.context.SaveChanges();
            return new CreatedAtActionResult(nameof(GetTrip), "Trip", new { id = newTrip.Id }, newTrip);
        }

        [HttpPost("new-group-trip")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateGroupTrip(InputTrip trip)
        {
            if (trip.GroupId == null || trip.UserId!=null)
                return new BadRequestResult();

            var newTrip = CreateNewTrip(trip);
            MainController.context.Trips.Add(newTrip);
            MainController.context.SaveChanges();
            return new CreatedAtActionResult(nameof(GetTrip), "Trip", new { id = newTrip.Id }, newTrip);
        }

        private static Trip CreateNewTrip(InputTrip it)
        {
            Guid newID = Guid.NewGuid();
            return new Trip
            {
                Id = newID,
                Name = it.Name,
                Description = it.Description,
                TripType = it.TripType,
                IsPublic = it.IsPublic,
                CreationDate = DateOnly.FromDateTime(DateTime.Now),
                SuggestedUsersNumber = it.SuggestedUsersNumber,
                GroupId = it.GroupId,
                UserId = it.UserId
            };
        }
    }
}
