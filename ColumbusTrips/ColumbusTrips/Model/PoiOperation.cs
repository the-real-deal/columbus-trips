using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class PoiOperation
{
    public Guid TicketId { get; set; }

    public string OperationTypeId { get; set; } = null!;

    public string CityId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Website { get; set; }

    public decimal Longitude { get; set; }

    public decimal Latitude { get; set; }

    public Guid? PoiId { get; set; }

    public string CurrentState { get; set; } = null!;

    public virtual City City { get; set; } = null!;

    public virtual State CurrentStateNavigation { get; set; } = null!;

    public virtual OperationType OperationType { get; set; } = null!;

    public virtual PointsOfInterest? Poi { get; set; }

    public virtual Ticket Ticket { get; set; } = null!;
}
