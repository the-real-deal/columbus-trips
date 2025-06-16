using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class State
{
    public string Value { get; set; } = null!;

    public virtual ICollection<ActivityOperation> ActivityOperations { get; set; } = new List<ActivityOperation>();

    public virtual ICollection<AdminStatefulChange> AdminStatefulChanges { get; set; } = new List<AdminStatefulChange>();

    public virtual ICollection<PoiOperation> PoiOperations { get; set; } = new List<PoiOperation>();
}
