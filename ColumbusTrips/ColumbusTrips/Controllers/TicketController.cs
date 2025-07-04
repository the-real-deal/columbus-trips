﻿using ColumbusTrips.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
namespace ColumbusTrips.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TicketController
    {
        public class PoiTicketInput
        {
            public string CityId { get; set; } = null!;
            public string Name { get; set; } = null!;
            public string Description { get; set; } = null!;
            public string? Website { get; set; }
            public decimal Longitude { get; set; }
            public decimal Latitude { get; set; }
            public Guid? PoiId { get; set; }
            public string UserId { get; set; } = null!;
        }

        [HttpGet("ticket/{id}")]
        [ProducesResponseType<Ticket>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetTicket(Guid id, [FromQuery(Name = "TicketType")] string type)
        {
            var ticket = MainController.context.Tickets.Where(tk => tk.Id == id);
            if (ticket == null)
            {
                return new NotFoundResult();
            }
            switch (type)
            {
                case "poi":
                    ticket.Include(tk=> tk.PoiOperation);
                    if (ticket.FirstOrDefault()?.PoiOperation == null)
                        return new NotFoundResult();
                    break;
                case "activity":
                    ticket.Include(tk => tk.ActivityOperation);
                    if (ticket.FirstOrDefault()?.ActivityOperation == null)
                        return new NotFoundResult();
                    break;
                case "invite":
                    ticket.Include(tk => tk.Invite);
                    if (ticket.FirstOrDefault()?.Invite == null)
                        return new NotFoundResult();
                    break;
                case "join":
                    ticket.Include(tk => tk.JoinRequest);
                    if (ticket.FirstOrDefault()?.JoinRequest == null)
                        return new NotFoundResult();
                    break;
                case "trip":
                    ticket.Include(tk => tk.TripChange);
                    if (ticket.FirstOrDefault()?.TripChange == null)
                        return new NotFoundResult();
                    break;
            }
            
            return new OkObjectResult(ticket);
        }

        [HttpGet("all-poi-tickets")]
        public IEnumerable<PoiOperation> GetAllActiveTickets()
        {
            return MainController.context.PoiOperations.Include(t => t.Ticket).ToList();
        }

        [HttpPut("open-poi-ticket")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult OpenPoiTicket([FromQuery(Name = "ticketId")] Guid id, [FromQuery(Name = "admin")] string admin) 
        {
            var ticket = MainController.context.PoiOperations.SingleOrDefault(t=>t.TicketId==id);
            if (ticket == null)
                return new BadRequestResult();
            ticket.CurrentState = "Open";
            var adminUpdate = new AdminStatefulChange()
            {
                Id = Guid.NewGuid(),
                Admin = admin,
                TicketId = ticket.TicketId,
                StateValue = "Open",
                DateChanged = DateOnly.FromDateTime(DateTime.Now)
            };
            MainController.context.AdminStatefulChanges.Add(adminUpdate);
            MainController.context.SaveChanges();
            return new AcceptedResult();
        }

        [HttpPut("close-poi-ticket")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult ClosePoiTicket([FromQuery(Name = "ticketId")] Guid id, [FromQuery(Name = "admin")] string admin, [FromQuery(Name = "accepted")] bool isAccepted)
        {
            var ticket = MainController.context.PoiOperations.Include(t=>t.Ticket).SingleOrDefault(t => t.TicketId == id);
            if (ticket == null)
                return new BadRequestResult();

            if (isAccepted)
            {
                ticket.CurrentState = "Accepted";
                ticket.Ticket.Result = true;
                var newPoi = new PointsOfInterest()
                {
                    Id = Guid.NewGuid(),
                    Name = ticket.Name,
                    Description = ticket.Description,
                    Website = ticket.Website,
                    Longitude = ticket.Longitude,
                    Latitude = ticket.Latitude,
                    Contributor = ticket.Ticket.UserId,
                    Location = ticket.CityId
                };
                MainController.context.PointsOfInterests.Add(newPoi);
            }
            else
            {
                ticket.CurrentState = "Denied";
                ticket.Ticket.Result = false;
            }

            var adminUpdate = new AdminStatefulChange()
            {
                Id = Guid.NewGuid(),
                Admin = admin,
                TicketId = ticket.TicketId,
                StateValue = isAccepted ? "Accepted":"Denied",
                DateChanged = DateOnly.FromDateTime(DateTime.Now)
            };
            MainController.context.AdminStatefulChanges.Add(adminUpdate);
            MainController.context.SaveChanges();
            return new AcceptedResult();
        }


        [HttpGet("ticket-types")]
        public IEnumerable<string> GetTicketTypes()
        {
            return new List<string> { "poi", "activity", "invite", "join", "trip" };
        }

        [HttpPost("join-request")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AskToJoin([FromQuery(Name = "groupId")] Guid groupId, [FromQuery(Name = "user")] string username)
        {
            var check = MainController.context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (check == null) return new NotFoundResult();
            if (check.GroupType != "Invite-Only")
                return new BadRequestResult();

            var ticket = CreateTicketBase(username, "Stateless");
            var joinrequest = new JoinRequest()
            {
                GroupId = groupId,
                TicketId = ticket.Id
            };
            MainController.context.Tickets.Add(ticket);
            MainController.context.JoinRequests.Add(joinrequest);
            MainController.context.SaveChanges();

            return new CreatedAtActionResult(nameof(GetTicket), "Ticket", new { id = ticket.Id, TicketType = "join" }, ticket); ;
        }

        [HttpPost("invite-user")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult InviteUser([FromQuery(Name = "groupId")] Guid groupId, [FromQuery(Name = "invited-user")] string username)
        {
            string? leader = MainController.context.Groups.FirstOrDefault(g => g.Id == groupId)?.Leader;
            if (leader == null) return new BadRequestResult();
            var ticket = CreateTicketBase(leader, "Stateless");
            var invite = new Invite()
            {
                GroupId = groupId,
                TicketId = ticket.Id,
                UserId = username
            };
            MainController.context.Tickets.Add(ticket);
            MainController.context.Invites.Add(invite);
            MainController.context.SaveChanges();

            return new CreatedAtActionResult(nameof(GetTicket), "Ticket", new { id = ticket.Id, TicketType = "invite" }, ticket); ;
        }


        [HttpPost("poi-insertion-attempt")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreatePoiTicket(PoiTicketInput poiOperation)
        {
            var ticket = CreateTicketBase(poiOperation.UserId,"Statefull");
            var newPoiOperation = new PoiOperation()
            {
                TicketId = ticket.Id,
                OperationTypeId = "Insertion",
                CityId = poiOperation.CityId,
                Name = poiOperation.Name,
                Description = poiOperation.Description,
                Website = poiOperation.Website,
                Longitude = poiOperation.Longitude,
                Latitude = poiOperation.Latitude,
                CurrentState = "Pending"
            };
            MainController.context.Tickets.Add(ticket);
            MainController.context.PoiOperations.Add(newPoiOperation);
            MainController.context.SaveChanges();
            return new CreatedAtActionResult(nameof(GetTicket), "Ticket", new { id = newPoiOperation.TicketId, TicketType="poi" }, ticket);
        }

        //[HttpPost("activity-insertion-attempt")]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public IActionResult CreateActivityTicket(PoiTicketInput poiOperation)
        //{
        //    var ticket = CreateTicketBase(poiOperation.UserId, "Statefull");
        //    var newPoiOperation = new PoiOperation()
        //    {
        //        TicketId = ticket.Id,
        //        OperationTypeId = "Insertion",
        //        CityId = poiOperation.CityId,
        //        Name = poiOperation.Name,
        //        Description = poiOperation.Description,
        //        Website = poiOperation.Website,
        //        Longitude = poiOperation.Longitude,
        //        Latitude = poiOperation.Latitude,
        //        CurrentState = "Pending"
        //    };
        //    MainController.context.Tickets.Add(ticket);
        //    MainController.context.PoiOperations.Add(newPoiOperation);
        //    MainController.context.SaveChanges();
        //    return new CreatedAtActionResult(nameof(GetTicket), "Ticket", new { id = newPoiOperation.TicketId, TicketType = "poi" }, ticket);
        //}

        private static Ticket CreateTicketBase(string username, string type)
        {
            return new Ticket() { Id = Guid.NewGuid(), OpeningDate= DateOnly.FromDateTime(DateTime.Now), UserId=username, TicketType=type };
        }
    }
}
