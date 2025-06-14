using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using static ColumbusTrips.Controllers.TicketController;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class UserController
    {
        
        [HttpGet("user-credential")]
        public IEnumerable<User> GetUserCredentials([FromQuery(Name = "username")] string username)
        {
            return MainController.context.Users.Where(u => u.Username == username);
        }

        [HttpGet("admin-credential")]
        public IEnumerable<Admin> GetAdminCredentials([FromQuery(Name = "nickname")] string nickname)
        {
            return MainController.context.Admins.Where(u => u.Nickname == nickname);
        }

        [HttpGet("user/{username}")]
        [ProducesResponseType<User>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUser(string username)
        {
            var user = MainController.context.Users.Where(u => u.Username== username).Include(u=>u.Categories).Include(u=>u.People).Include(u=>u.PolicyPreference);
            if (user == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(user);
        }

        public class UserInput
        {
            public string Username { get; set; } = null!;
            public string Email { get; set; } = null!;
            public string Password { get; set; } = null!;
            public bool Profiling { get; set; }
            public bool Marketing { get; set; }
            public bool SocialSharing { get; set; }
            public bool ThirdPartySharing { get; set; }
            public string DocumentNumber { get; set; } = null!;
            public string Name { get; set; } = null!;
            public string Surname { get; set; } = null!;
            public DateOnly BirthDate { get; set; }
            public string? ResidenceCity { get; set; }
            public string? Street { get; set; }
            public int? StreetNumber { get; set; }
            public List<string> Preferences { get; set; } = null!;
        }

        [HttpPost("new-user")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CreateUserTrip(UserInput user)
        {
            Console.WriteLine(user.Username);
            if (MainController.context.Users.Where(u => u.Username == user.Username).ToList().Count >= 1)
            {
                return new BadRequestResult();
            }
            string hashedPassword = sha256_hash(user.Password);
            var cats = MainController.context.Categories.ToList();
            var preferences = new List<Category>();

            foreach (var category in user.Preferences)
            {
                var found = cats.Where(c => c.Value == category).First();
                if (found != null)
                    preferences.Add(found);
                else
                    return new NotFoundResult();
            }

            var newUser = new User()
            {
                Username = user.Username,
                Password = hashedPassword,
                Email = user.Email,
                CreationDate = DateOnly.FromDateTime(DateTime.Now),
                IsActive = true,
                Categories = preferences
            };
            var newPerson = new Person()
            {
                Name = user.Name,
                Surname = user.Surname,
                BirthDate = user.BirthDate,
                DocumentNumber = user.DocumentNumber,
                UserId = user.Username,
                ResidenceCity = user.ResidenceCity,
                Street = user.Street,
                StreetNumber = user.StreetNumber,
            };
            var policy = new PolicyPreference()
            {
                UserId = user.Username,
                AdvancedProfiling = user.Profiling,
                DirectMarketing = user.Marketing,
                DataSharingWithThirdPartyCompanies = user.ThirdPartySharing,
                DataSharingWithSocialNetworks = user.SocialSharing
            };
            MainController.context.Users.Add(newUser);
            MainController.context.People.Add(newPerson);
            MainController.context.PolicyPreferences.Add(policy);
            MainController.context.SaveChanges();
        
            return new CreatedAtActionResult(nameof(GetUser), "User", new { username= newUser.Username}, newUser);
        }

        static string sha256_hash(String value)
        {
            using (SHA256 hash = SHA256.Create())
            {
                return String.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));
            }
        }
    }
}
