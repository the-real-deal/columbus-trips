using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Image
{
    public Guid Id { get; set; }

    public byte[] Image1 { get; set; } = null!;

    public virtual ICollection<PointsOfInterest> Pois { get; set; } = new List<PointsOfInterest>();

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
