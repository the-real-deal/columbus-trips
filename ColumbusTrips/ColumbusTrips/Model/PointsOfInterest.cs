using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class PointsOfInterest
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Website { get; set; }

    public decimal Longitude { get; set; }

    public decimal Latitude { get; set; }

    public string? Contributor { get; set; }

    public string Location { get; set; } = null!;

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual User? ContributorNavigation { get; set; }

    public virtual ICollection<Itinerary> Itineraries { get; set; } = new List<Itinerary>();

    public virtual City LocationNavigation { get; set; } = null!;

    public virtual ICollection<PoiOperation> PoiOperations { get; set; } = new List<PoiOperation>();

    public virtual ICollection<PoiTheme> PoiThemes { get; set; } = new List<PoiTheme>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<TripEdit> TripEdits { get; set; } = new List<TripEdit>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();
}
