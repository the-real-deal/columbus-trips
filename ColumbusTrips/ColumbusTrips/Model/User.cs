using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class User
{
    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateOnly CreationDate { get; set; }

    public bool IsActive { get; set; }

    public byte[]? ProfilePicture { get; set; }

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();

    public virtual ICollection<Invite> Invites { get; set; } = new List<Invite>();

    public virtual ICollection<Person> People { get; set; } = new List<Person>();

    public virtual ICollection<PointsOfInterest> PointsOfInterests { get; set; } = new List<PointsOfInterest>();

    public virtual PolicyPreference? PolicyPreference { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    public virtual ICollection<TripChange> TripChanges { get; set; } = new List<TripChange>();

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<Group> GroupsNavigation { get; set; } = new List<Group>();
}
