using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Review
{
    public Guid Id { get; set; }

    public string Text { get; set; } = null!;

    public sbyte Rating { get; set; }

    public DateOnly DateWritten { get; set; }

    public string UserId { get; set; } = null!;

    public Guid? TripId { get; set; }

    public Guid? PointOfInterestId { get; set; }

    public virtual PointsOfInterest? PointOfInterest { get; set; }

    public virtual Trip? Trip { get; set; }

    public virtual User User { get; set; } = null!;
}
