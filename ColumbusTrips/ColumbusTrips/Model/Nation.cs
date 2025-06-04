using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class Nation
{
    public string Iso2 { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string PhoneCode { get; set; } = null!;

    public string Currency { get; set; } = null!;

    public string CurrencyName { get; set; } = null!;

    public virtual ICollection<City> Cities { get; set; } = new List<City>();
}
