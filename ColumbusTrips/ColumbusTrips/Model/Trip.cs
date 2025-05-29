using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Trip
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string TripType { get; set; } = null!;

    public DateOnly CreationDate { get; set; }

    public bool IsPublic { get; set; }

    public int? SuggestedUsersNumber { get; set; }

    public Guid? GroupId { get; set; }

    public string? UserId { get; set; }

    public virtual Group? Group { get; set; }

    public virtual ICollection<Itinerary> Itineraries { get; set; } = new List<Itinerary>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<TripChange> TripChanges { get; set; } = new List<TripChange>();

    public virtual TripType TripTypeNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}
