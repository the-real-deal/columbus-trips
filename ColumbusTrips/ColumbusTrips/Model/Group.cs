using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Group
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public byte[]? GroupPicture { get; set; }

    public string GroupType { get; set; } = null!;

    public string Leader { get; set; } = null!;

    public virtual GroupType GroupTypeNavigation { get; set; } = null!;

    public virtual ICollection<Interest> Interests { get; set; } = new List<Interest>();

    public virtual ICollection<Invite> Invites { get; set; } = new List<Invite>();

    public virtual ICollection<JoinRequest> JoinRequests { get; set; } = new List<JoinRequest>();

    public virtual User LeaderNavigation { get; set; } = null!;

    public virtual ICollection<TripChange> TripChanges { get; set; } = new List<TripChange>();

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
