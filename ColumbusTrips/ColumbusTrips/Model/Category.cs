using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Category
{
    public string Value { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Interest> Interests { get; set; } = new List<Interest>();

    public virtual ICollection<PoiTheme> PoiThemes { get; set; } = new List<PoiTheme>();

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
