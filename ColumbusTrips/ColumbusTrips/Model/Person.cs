using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Person
{
    public string DocumentNumber { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string UserId { get; set; } = null!;

    public string? ResidenceCity { get; set; }

    public string? Street { get; set; }

    public int? StreetNumber { get; set; }

    public virtual City? ResidenceCityNavigation { get; set; }

    public virtual User User { get; set; } = null!;
}
