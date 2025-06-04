using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class TripChange
{
    public Guid TicketId { get; set; }

    public Guid TripId { get; set; }

    public Guid GroupId { get; set; }

    public string Handler { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;

    public virtual User HandlerNavigation { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;

    public virtual Trip Trip { get; set; } = null!;
}
