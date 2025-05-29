using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Interest
{
    public string CategoryId { get; set; } = null!;

    public Guid GroupId { get; set; }

    public int Weight { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;
}
