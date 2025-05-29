using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class City
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public decimal Longitude { get; set; }

    public decimal Latitude { get; set; }

    public string CountryCode { get; set; } = null!;

    public virtual Nation CountryCodeNavigation { get; set; } = null!;

    public virtual ICollection<Person> People { get; set; } = new List<Person>();

    public virtual ICollection<PoiOperation> PoiOperations { get; set; } = new List<PoiOperation>();

    public virtual ICollection<PointsOfInterest> PointsOfInterests { get; set; } = new List<PointsOfInterest>();
}
