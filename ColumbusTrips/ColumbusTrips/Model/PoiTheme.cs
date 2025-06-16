using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class PoiTheme
{
    public Guid PoiId { get; set; }

    public string Category { get; set; } = null!;

    public int Weight { get; set; }

    public virtual Category CategoryNavigation { get; set; } = null!;

    public virtual PointsOfInterest Poi { get; set; } = null!;
}
