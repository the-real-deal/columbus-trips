using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class GroupType
{
    public string Value { get; set; } = null!;

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
}
