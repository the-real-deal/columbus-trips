using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class TripEdit
{
    public Guid Id { get; set; }

    public Guid PointOfInterestId { get; set; }

    public Guid TicketId { get; set; }

    public int Order { get; set; }

    public string OperationType { get; set; } = null!;

    public virtual OperationType OperationTypeNavigation { get; set; } = null!;

    public virtual PointsOfInterest PointOfInterest { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
