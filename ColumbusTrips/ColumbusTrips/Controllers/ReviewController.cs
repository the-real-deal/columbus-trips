using ColumbusTrips.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static ColumbusTrips.Controllers.StatisticsController;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class ReviewController
    {
        [HttpGet("poi-reviews")]
        public IEnumerable<Review> GetPoiReviews([FromQuery(Name ="poiId")] Guid id)
        {
            return MainController.context.Reviews.Where(review => review.PointOfInterestId!= null && review.PointOfInterestId==id).ToList();
        }
        [HttpGet("itinerary-reviews")]
        public IEnumerable<Review> GetItineraryReviews([FromQuery(Name = "itId")] Guid id)
        {
            return MainController.context.Reviews.Where(review => review.TripId != null && review.TripId == id).ToList();
        }

        [HttpGet("review/{id}")]
        [ProducesResponseType<Review>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetReview(Guid id)
        {
            var review = MainController.context.Reviews.FirstOrDefault(review => review.Id == id);
            if (review == null) 
            {
                return new NotFoundResult();
            }
            return new  OkObjectResult(review);
        }

        public class ReviewInput
        {
            public string Text { get; set; } = null!;

            public sbyte Rating { get; set; }

            public string UserId { get; set; } = null!;

            public Guid? TripId { get; set; }

            public Guid? PointOfInterestId { get; set; }
        }

        [HttpPost("new-poi-review")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult WritePoiReview(ReviewInput review) 
        {
            if (review.PointOfInterestId == null)
            {
                return new BadRequestResult();
            }
            Guid newID = Guid.NewGuid();
            var insertReview = new Review() { 
                Id=newID,
                Text=review.Text,
                Rating=review.Rating,
                DateWritten= DateOnly.FromDateTime(DateTime.Now),
                UserId=review.UserId,
                TripId=null,
                PointOfInterestId=review.PointOfInterestId};
            MainController.context.Reviews.Add(insertReview);
            MainController.context.SaveChanges();
            /*Possible Way to Do*/
            //MainController.context.Database.ExecuteSql(@$"
            //    INSERT INTO `ColumbusTrips`.`Reviews`(`ID`,`Text`,`Rating`,`Date_Written`,`UserID`,`TripID`,`Point_of_Interest_ID`)
            //    VALUES
            //    ({newID},{review.Text},{review.Rating},{DateTime.Now.ToString("yyyy-MM-dd")},{review.UserId},null,{review.PointOfInterestId});");
            return new CreatedAtActionResult(nameof(GetReview), "Review", new { id = insertReview.Id }, insertReview);

        }

        [HttpPost("new-trip-review")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult WriteTripReview(ReviewInput review)
        {
            if (review.TripId == null)
            {
                return new BadRequestResult();
            }
            var insertReview = GetNewReviewObject(review);
            MainController.context.Reviews.Add(insertReview);
            MainController.context.SaveChanges();
            return new CreatedAtActionResult(nameof(GetReview), "Review", new { id = insertReview.Id }, insertReview);
        }

        private static Review GetNewReviewObject(ReviewInput input)
        {
            Guid newID = Guid.NewGuid();
            var insertReview = new Review()
            {
                Id = newID,
                Text = input.Text,
                Rating = input.Rating,
                DateWritten = DateOnly.FromDateTime(DateTime.Now),
                UserId = input.UserId,
                TripId = input.TripId,
                PointOfInterestId = input.PointOfInterestId
            };
            return insertReview;
        }
    }
}
