using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Activity
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int Duration { get; set; }

    public int MinPrice { get; set; }

    public int MaxPrice { get; set; }

    public Guid PointOfInterestId { get; set; }

    public virtual ICollection<ActivityOperation> ActivityOperations { get; set; } = new List<ActivityOperation>();

    public virtual PointsOfInterest PointOfInterest { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
