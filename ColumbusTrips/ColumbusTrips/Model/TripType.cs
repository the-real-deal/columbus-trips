using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class TripType
{
    public string Value { get; set; } = null!;

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
