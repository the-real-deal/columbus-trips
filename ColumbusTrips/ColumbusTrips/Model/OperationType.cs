using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class OperationType
{
    public string Value { get; set; } = null!;

    public virtual ICollection<ActivityOperation> ActivityOperations { get; set; } = new List<ActivityOperation>();

    public virtual ICollection<PoiOperation> PoiOperations { get; set; } = new List<PoiOperation>();

    public virtual ICollection<TripEdit> TripEdits { get; set; } = new List<TripEdit>();
}
