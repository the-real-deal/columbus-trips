using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Admin
{
    public string Nickname { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<AdminStatefulChange> AdminStatefulChanges { get; set; } = new List<AdminStatefulChange>();
}
