using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class ActivityOperation
{
    public Guid TicketId { get; set; }

    public string CurrentState { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int Duration { get; set; }

    public int MinPrice { get; set; }

    public int MaxPrice { get; set; }

    public Guid? ActivityId { get; set; }

    public string OperationType { get; set; } = null!;

    public virtual Activity? Activity { get; set; }

    public virtual State CurrentStateNavigation { get; set; } = null!;

    public virtual OperationType OperationTypeNavigation { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
