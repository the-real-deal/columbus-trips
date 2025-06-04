using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Invite
{
    public Guid TicketId { get; set; }

    public string UserId { get; set; } = null!;

    public Guid GroupId { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
