using ColumbusTrips.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static ColumbusTrips.Controllers.TripController;

namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class GroupController
    {
        [HttpGet("my-groups")]
        public IEnumerable<Group> GetMyGroups([FromQuery(Name = "username")] string username)
        {
            return MainController.context.Groups.FromSqlInterpolated($"select g.* from Memberships m join `Groups` g on g.ID=m.GroupID where m.UserID={username}");
        }

        [HttpGet("search-group")]
        public IEnumerable<Group> GetGroupsByName([FromQuery(Name = "groupname")] string groupname)
        {
            return MainController.context.Groups.Where(g => (g.GroupType == "Public" || g.GroupType == "Invite-Only") && g.Name.Contains(groupname));
        }

        [HttpGet("group-types")]
        public IEnumerable<GroupType> GetGroupTypes()
        {
            return MainController.context.GroupTypes.ToList();
        }

        [HttpGet("{id}")]
        [ProducesResponseType<Group>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetGroup(Guid id)
        {
            var group = MainController.context.Groups.FirstOrDefault(g=> g.Id == id);
            if (group == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(group);
        }

        public class InputGroup
        {
            public string Name { get; set; } = null!;
            public string Description { get; set; } = null!;
            public string GroupType { get; set; } = null!;
            public string Leader { get; set; } = null!;
        }

        [HttpPost("new-group")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateGroup(InputGroup newGroup)
        {
            Guid guid = Guid.NewGuid();
            var group = new Group()
            {
                Id = guid,
                Name = newGroup.Name,
                Description = newGroup.Description,
                GroupType = newGroup.GroupType,
                Leader = newGroup.Leader
            };
            MainController.context.Groups.Add(group);
            MainController.context.SaveChanges();
            return new CreatedAtActionResult(nameof(GetGroup), "Group", new { id = guid}, group);
        }
    }
}
