using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class AdminStatefulChange
{
    public Guid Id { get; set; }

    public Guid TicketId { get; set; }

    public string StateValue { get; set; } = null!;

    public DateOnly DateChanged { get; set; }

    public string Admin { get; set; } = null!;

    public virtual Admin AdminNavigation { get; set; } = null!;

    public virtual State StateValueNavigation { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
