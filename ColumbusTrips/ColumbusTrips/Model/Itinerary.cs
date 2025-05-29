using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Itinerary
{
    public int? Order { get; set; }

    public Guid TripId { get; set; }

    public Guid PointOfInterestId { get; set; }

    public virtual PointsOfInterest PointOfInterest { get; set; } = null!;

    public virtual Trip Trip { get; set; } = null!;
}
