using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class JoinRequest
{
    public Guid TicketId { get; set; }

    public Guid GroupId { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
