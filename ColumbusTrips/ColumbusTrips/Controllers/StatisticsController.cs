using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ColumbusTrips.Controllers
{

    [ApiController]
    [Route("[Controller]")]
    public class StatisticsController
    {
        public class BestPoisByCat
        {
            public string? Name { get; set; }
            public Guid POI_ID { get; set; }
            public string? Category { get; set; }
            public int Weight { get; set; }
            public double maxAvgRate { get; set; }
        }

        [HttpGet("best-poi-by-category")]
        [ProducesResponseType<IEnumerable<BestPoisByCat>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetBestPoiByCat([FromQuery(Name = "username")] string username)
        {
            var tmp = MainController.context.Users.Where(u => u.Username == username).Include(u => u.People).ThenInclude(p => p.ResidenceCityNavigation);
            var coordinates = tmp.Select(u => new { u.People.First().ResidenceCityNavigation.Longitude, u.People.First().ResidenceCityNavigation.Latitude }).First();

            if (tmp.First().People.First().ResidenceCity==null)
                return new NotFoundResult();
            
            var ret = MainController.context.Database.SqlQuery<BestPoisByCat>(@$"
                WITH bestPois(POI_ID,Category,Weight,avg_Rate) as 
                (SELECT 
                    POI_ID, Category, Weight, avg_Rate
                FROM
                    Poi_Themes poi_tms
                        JOIN
                    (SELECT 
                        near_poi.ID, AVG(R.rate) avg_Rate
                    FROM
                        ((SELECT 
                        rev.Point_of_Interest_ID poi, rev.Rating rate
                    FROM
                        Reviews rev
                    WHERE
                        DAY(rev.Date_Written) - DAY(NOW()) < 30
                            AND rev.Point_of_Interest_ID IS NOT NULL) R
                    JOIN (SELECT 
                        *
                    FROM
                        (SELECT 
                        *,
                            111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(P.Latitude)) * COS(RADIANS({coordinates.Latitude})) * COS(RADIANS(P.Longitude - {coordinates.Longitude})) + SIN(RADIANS(P.Latitude)) * SIN(RADIANS({coordinates.Latitude}))))) distanceKm
                    FROM
                        Points_of_Interest P) interest_poi
                    WHERE
                        distanceKm < 20) near_poi ON R.poi = near_poi.ID)
                    GROUP BY near_poi.ID
                    HAVING avg_Rate > 2.0) poi_tmp ON poi_tms.POI_ID = poi_tmp.ID)
                SELECT 
                    p.Name, bestPoisByCat.*
                FROM
                    Points_of_Interest p
                        JOIN
                    (SELECT 
                        POI_ID, Category, Weight, maxRate maxAvgRate
                    FROM
                        (SELECT 
                        bp.Category cat,
                            MAX(bp.Weight) maxWeight,
                            MAX(avg_Rate) maxRate
                    FROM
                        bestPois bp
                    GROUP BY bp.Category) maxW
                    JOIN bestPois bp ON maxW.cat = bp.Category
                        AND maxW.maxWeight = bp.Weight
                        AND avg_Rate = maxRate) bestPoisByCat ON bestPoisByCat.POI_ID = p.ID;").ToList();
            return new OkObjectResult(ret);
        }

        public class PoisAroundYou
        {
            public Guid ActivityID { get; set; }
            public string? ActivityName { get; set; }
            public string? ActivityDescription { get; set; }
            public int ActivityDuration { get; set; }
            public int ActivityMaxPrice { get; set; }
            public int ActivityMinPrice { get; set; }
            public Guid PoiID { get; set; }
            public string? PoiName { get; set; }
            public double distanceKm { get; set; }
            public string? Category { get; set; }
        }

        [HttpGet("poi-around-you")]
        [ProducesResponseType<IEnumerable<PoisAroundYou>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPoisAroundYou([FromQuery(Name ="username")] string username)
        {
            var tmp = MainController.context.Users.Where(u => u.Username == username).Include(u => u.People).ThenInclude(p => p.ResidenceCityNavigation);
            
            if (tmp.First().People.First().ResidenceCity == null)
                return new NotFoundResult();

            var result = MainController.context.Database.SqlQuery<PoisAroundYou>($@"
               WITH userinfo(Username,City,CityID,Longitude,Latitude,Category)
                 AS (
                 SELECT 
                     p.UserID,
                     c.Name,
                     p.Residence_City,
                     c.Longitude,
                     c.Latitude,
                     pr.CategoryID
                 FROM
                     (People p
                     JOIN Cities c ON p.Residence_City = c.ID)
                         JOIN
                     Preferences pr ON pr.UserID = p.UserID
                 WHERE
                     p.UserID = {username})
                 SELECT DISTINCT
                     a.ID ActivityID,
                     a.Name ActivityName,
                     a.Description ActivityDescription,
                     a.Duration ActivityDuration,
                     a.Max_Price ActivityMaxPrice,
                     a.Min_Price ActivityMinPrice,
                     final.Name PoiName,
                     final.ID PoiID,
                     distanceKm,
                     ath.CategoryID Category
                 FROM
                     (SELECT 
                         ID,
                             Name,
                             111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(poiLat)) * COS(RADIANS(citLat)) * COS(RADIANS(poiLong - citLong)) + SIN(RADIANS(poiLat)) * SIN(RADIANS(citLat))))) distanceKm
                     FROM
                         ((SELECT 
                         poi.ID, poi.Name, poi.Longitude poiLong, poi.Latitude poiLat
                     FROM
                         Points_of_Interest poi
                     JOIN Poi_Themes pt ON poi.ID = pt.POI_ID
                     WHERE
                         pt.Category IN (SELECT 
                                 uf.Category
                             FROM
                                 userinfo uf)) userPOIs, (SELECT DISTINCT
                         uifo.CityID,
                             uifo.City,
                             uifo.Longitude citLong,
                             uifo.Latitude citLat
                     FROM
                         userinfo uifo) userCty)) final
                         JOIN
                     Activities a ON final.ID = a.Point_of_InterestID
                         JOIN
                     Activity_Themes ath ON a.ID = ath.ActivityID
                 WHERE
                     distanceKm < 10
                         AND ath.CategoryID IN (SELECT 
                             userinfo.Category
                         FROM
                             userinfo);").ToList();
            return new OkObjectResult(result);
        }

        public class BestPois
        {
            public Guid Id { get; set; }

            public string Name { get; set; } = null!;

            public string Description { get; set; } = null!;

            public int NumberOfReviews { get; set; }
            public double AverageRating { get; set; }
        }

        [HttpGet("best-pois")]
        [ProducesResponseType<IEnumerable<BestPois>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetBestPois()
        {
            var result = MainController.context.Database.SqlQuery<BestPois>(
                @$"SELECT 
                    p.ID,p.Name,p.Description, NumberOfReviews, AverageRating
                FROM
                    Points_of_Interest p
                        JOIN
                    (SELECT 
                        poi.ID,
                            COUNT(*) NumberOfReviews,
                            AVG(r.Rating) AverageRating
                    FROM
                        Points_of_Interest poi
                    JOIN Reviews r ON poi.ID = r.Point_of_Interest_ID
                    GROUP BY poi.ID
                    ORDER BY NumberOfReviews DESC , AverageRating DESC
                    LIMIT 10) revs ON p.ID = revs.ID;").ToList();
            return new OkObjectResult(result);
        }
    }
}
