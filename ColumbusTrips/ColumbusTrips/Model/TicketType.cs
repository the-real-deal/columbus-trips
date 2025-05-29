using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class TicketType
{
    public string Value { get; set; } = null!;

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
