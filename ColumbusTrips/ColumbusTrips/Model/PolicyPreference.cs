using System;
using System.Collections.Generic;

namespace ColumbusTrips.Model;

public partial class PolicyPreference
{
    public string UserId { get; set; } = null!;

    public bool? AdvancedProfiling { get; set; }

    public bool? DirectMarketing { get; set; }

    public bool? DataSharingWithThirdPartyCompanies { get; set; }

    public bool? DataSharingWithSocialNetworks { get; set; }

    public virtual User User { get; set; } = null!;
}
