using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Ticket
{
    public Guid Id { get; set; }

    public DateOnly OpeningDate { get; set; }

    public bool? Result { get; set; }

    public string UserId { get; set; } = null!;

    public string TicketType { get; set; } = null!;

    public virtual ActivityOperation? ActivityOperation { get; set; }

    public virtual ICollection<AdminStatefulChange> AdminStatefulChanges { get; set; } = new List<AdminStatefulChange>();

    public virtual Invite? Invite { get; set; }

    public virtual JoinRequest? JoinRequest { get; set; }

    public virtual PoiOperation? PoiOperation { get; set; }

    public virtual TicketType TicketTypeNavigation { get; set; } = null!;

    public virtual TripChange? TripChange { get; set; }

    public virtual ICollection<TripEdit> TripEdits { get; set; } = new List<TripEdit>();

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();
}
