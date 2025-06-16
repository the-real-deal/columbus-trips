 using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace ColumbusTrips.Model;

public partial class ColumbusTrips : DbContext
{
    public ColumbusTrips()
    {
    }

    public ColumbusTrips(DbContextOptions<ColumbusTrips> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<ActivityOperation> ActivityOperations { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<AdminStatefulChange> AdminStatefulChanges { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<GroupType> GroupTypes { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Interest> Interests { get; set; }

    public virtual DbSet<Invite> Invites { get; set; }

    public virtual DbSet<Itinerary> Itineraries { get; set; }

    public virtual DbSet<JoinRequest> JoinRequests { get; set; }

    public virtual DbSet<Nation> Nations { get; set; }

    public virtual DbSet<OperationType> OperationTypes { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<PoiOperation> PoiOperations { get; set; }

    public virtual DbSet<PoiTheme> PoiThemes { get; set; }

    public virtual DbSet<PointsOfInterest> PointsOfInterests { get; set; }

    public virtual DbSet<PolicyPreference> PolicyPreferences { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<TicketType> TicketTypes { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<TripChange> TripChanges { get; set; }

    public virtual DbSet<TripEdit> TripEdits { get; set; }

    public virtual DbSet<TripType> TripTypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;uid=root;password=Password123!;database=ColumbusTrips", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.42-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.PointOfInterestId, "Activities_ibfk_1");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.MaxPrice).HasColumnName("Max_Price");
            entity.Property(e => e.MinPrice).HasColumnName("Min_Price");
            entity.Property(e => e.Name).HasMaxLength(60);
            entity.Property(e => e.PointOfInterestId).HasColumnName("Point_of_InterestID");

            entity.HasOne(d => d.PointOfInterest).WithMany(p => p.Activities)
                .HasForeignKey(d => d.PointOfInterestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Activities_ibfk_1");

            entity.HasMany(d => d.Categories).WithMany(p => p.Activities)
                .UsingEntity<Dictionary<string, object>>(
                    "ActivityTheme",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Activity_Themes_ibfk_2"),
                    l => l.HasOne<Activity>().WithMany()
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Activity_Themes_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ActivityId", "CategoryId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Activity_Themes");
                        j.HasIndex(new[] { "CategoryId" }, "CategoryID");
                        j.IndexerProperty<Guid>("ActivityId").HasColumnName("ActivityID");
                        j.IndexerProperty<string>("CategoryId")
                            .HasMaxLength(20)
                            .HasColumnName("CategoryID");
                    });
        });

        modelBuilder.Entity<ActivityOperation>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PRIMARY");

            entity.ToTable("Activity_Operations");

            entity.HasIndex(e => e.ActivityId, "Activity_Operations_ibfk_2");

            entity.HasIndex(e => e.OperationType, "Activity_Operations_ibfk_3");

            entity.HasIndex(e => e.CurrentState, "Activity_Operations_ibfk_4");

            entity.Property(e => e.TicketId)
                .ValueGeneratedOnAdd()
                .HasColumnName("TicketID");
            entity.Property(e => e.ActivityId).HasColumnName("ActivityID");
            entity.Property(e => e.CurrentState)
                .HasMaxLength(20)
                .HasColumnName("Current_State");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.MaxPrice).HasColumnName("Max_Price");
            entity.Property(e => e.MinPrice).HasColumnName("Min_Price");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.OperationType)
                .HasMaxLength(20)
                .HasColumnName("Operation_Type");

            entity.HasOne(d => d.Activity).WithMany(p => p.ActivityOperations)
                .HasForeignKey(d => d.ActivityId)
                .HasConstraintName("Activity_Operations_ibfk_2");

            entity.HasOne(d => d.CurrentStateNavigation).WithMany(p => p.ActivityOperations)
                .HasForeignKey(d => d.CurrentState)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Activity_Operations_ibfk_4");

            entity.HasOne(d => d.OperationTypeNavigation).WithMany(p => p.ActivityOperations)
                .HasForeignKey(d => d.OperationType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Activity_Operations_ibfk_3");

            entity.HasOne(d => d.Ticket).WithOne(p => p.ActivityOperation)
                .HasForeignKey<ActivityOperation>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Activity_Operations_ibfk_5");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Nickname).HasName("PRIMARY");

            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Password)
                .HasMaxLength(60)
                .IsFixedLength();
            entity.Property(e => e.Surname).HasMaxLength(255);
        });

        modelBuilder.Entity<AdminStatefulChange>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Admin_Stateful_Change");

            entity.HasIndex(e => e.StateValue, "Admin_Stateful_Change_ibfk_2");

            entity.HasIndex(e => e.Admin, "Admin_Stateful_Change_ibfk_3");

            entity.HasIndex(e => e.TicketId, "Admin_Stateful_Change_ibfk_4");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DateChanged).HasColumnName("Date_Changed");
            entity.Property(e => e.StateValue)
                .HasMaxLength(20)
                .HasColumnName("State_Value");
            entity.Property(e => e.TicketId).HasColumnName("Ticket_ID");

            entity.HasOne(d => d.AdminNavigation).WithMany(p => p.AdminStatefulChanges)
                .HasForeignKey(d => d.Admin)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Admin_Stateful_Change_ibfk_3");

            entity.HasOne(d => d.StateValueNavigation).WithMany(p => p.AdminStatefulChanges)
                .HasForeignKey(d => d.StateValue)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Admin_Stateful_Change_ibfk_2");

            entity.HasOne(d => d.Ticket).WithMany(p => p.AdminStatefulChanges)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Admin_Stateful_Change_ibfk_4");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.Property(e => e.Value).HasMaxLength(20);
            entity.Property(e => e.Description).HasMaxLength(255);
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.CountryCode, "Cities_ibfk_1");

            entity.Property(e => e.Id)
                .HasMaxLength(36)
                .HasColumnName("ID");
            entity.Property(e => e.CountryCode)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.Latitude).HasPrecision(8, 6);
            entity.Property(e => e.Longitude).HasPrecision(9, 6);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.CountryCodeNavigation).WithMany(p => p.Cities)
                .HasForeignKey(d => d.CountryCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Cities_ibfk_1");
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.GroupType, "Groups_ibfk_1");

            entity.HasIndex(e => e.Leader, "Groups_ibfk_2");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.GroupPicture)
                .HasColumnType("blob")
                .HasColumnName("Group_Picture");
            entity.Property(e => e.GroupType)
                .HasMaxLength(20)
                .HasColumnName("Group_Type");
            entity.Property(e => e.Leader).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.GroupTypeNavigation).WithMany(p => p.Groups)
                .HasForeignKey(d => d.GroupType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Groups_ibfk_1");

            entity.HasOne(d => d.LeaderNavigation).WithMany(p => p.Groups)
                .HasForeignKey(d => d.Leader)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Groups_ibfk_2");
        });

        modelBuilder.Entity<GroupType>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.ToTable("Group_Types");

            entity.Property(e => e.Value).HasMaxLength(20);
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Image1)
                .HasColumnType("blob")
                .HasColumnName("Image");
        });

        modelBuilder.Entity<Interest>(entity =>
        {
            entity.HasKey(e => new { e.CategoryId, e.GroupId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.HasIndex(e => e.GroupId, "Interests_ibfk_2");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(20)
                .HasColumnName("CategoryID");
            entity.Property(e => e.GroupId).HasColumnName("GroupID");

            entity.HasOne(d => d.Category).WithMany(p => p.Interests)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Interests_ibfk_1");

            entity.HasOne(d => d.Group).WithMany(p => p.Interests)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Interests_ibfk_2");
        });

        modelBuilder.Entity<Invite>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PRIMARY");

            entity.ToTable("Invite");

            entity.HasIndex(e => e.UserId, "Invite_ibfk_2");

            entity.HasIndex(e => e.GroupId, "Invite_ibfk_3");

            entity.Property(e => e.TicketId)
                .ValueGeneratedOnAdd()
                .HasColumnName("TicketID");
            entity.Property(e => e.GroupId).HasColumnName("GroupID");
            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");

            entity.HasOne(d => d.Group).WithMany(p => p.Invites)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Invite_ibfk_3");

            entity.HasOne(d => d.Ticket).WithOne(p => p.Invite)
                .HasForeignKey<Invite>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Invite_ibfk_4");

            entity.HasOne(d => d.User).WithMany(p => p.Invites)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Invite_ibfk_2");
        });

        modelBuilder.Entity<Itinerary>(entity =>
        {
            entity.HasKey(e => new { e.TripId, e.PointOfInterestId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("Itinerary");

            entity.HasIndex(e => e.PointOfInterestId, "Itinerary_ibfk_2");

            entity.Property(e => e.TripId).HasColumnName("Trip_ID");
            entity.Property(e => e.PointOfInterestId).HasColumnName("Point_of_Interest_ID");

            entity.HasOne(d => d.PointOfInterest).WithMany(p => p.Itineraries)
                .HasForeignKey(d => d.PointOfInterestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Itinerary_ibfk_2");

            entity.HasOne(d => d.Trip).WithMany(p => p.Itineraries)
                .HasForeignKey(d => d.TripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Itinerary_ibfk_3");
        });

        modelBuilder.Entity<JoinRequest>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PRIMARY");

            entity.ToTable("Join_Request");

            entity.HasIndex(e => e.GroupId, "Join_Request_ibfk_2");

            entity.Property(e => e.TicketId)
                .ValueGeneratedOnAdd()
                .HasColumnName("TicketID");
            entity.Property(e => e.GroupId).HasColumnName("GroupID");

            entity.HasOne(d => d.Group).WithMany(p => p.JoinRequests)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Join_Request_ibfk_2");

            entity.HasOne(d => d.Ticket).WithOne(p => p.JoinRequest)
                .HasForeignKey<JoinRequest>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Join_Request_ibfk_3");
        });

        modelBuilder.Entity<Nation>(entity =>
        {
            entity.HasKey(e => e.Iso2).HasName("PRIMARY");

            entity.Property(e => e.Iso2)
                .HasMaxLength(2)
                .IsFixedLength()
                .HasColumnName("ISO2");
            entity.Property(e => e.Currency)
                .HasMaxLength(3)
                .IsFixedLength();
            entity.Property(e => e.CurrencyName)
                .HasMaxLength(50)
                .HasColumnName("Currency_Name");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.PhoneCode)
                .HasMaxLength(10)
                .HasColumnName("Phone_Code");
        });

        modelBuilder.Entity<OperationType>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.ToTable("Operation_Types");

            entity.Property(e => e.Value).HasMaxLength(20);
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.DocumentNumber).HasName("PRIMARY");

            entity.HasIndex(e => e.UserId, "People_ibfk_1");

            entity.HasIndex(e => e.ResidenceCity, "People_ibfk_2_idx");

            entity.Property(e => e.DocumentNumber)
                .HasMaxLength(50)
                .HasColumnName("Document_Number");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.ResidenceCity)
                .HasMaxLength(36)
                .HasColumnName("Residence_City");
            entity.Property(e => e.Street).HasMaxLength(255);
            entity.Property(e => e.StreetNumber).HasColumnName("Street_Number");
            entity.Property(e => e.Surname).HasMaxLength(255);
            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");

            entity.HasOne(d => d.ResidenceCityNavigation).WithMany(p => p.People)
                .HasForeignKey(d => d.ResidenceCity)
                .HasConstraintName("People_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.People)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("People_ibfk_1");
        });

        modelBuilder.Entity<PoiOperation>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PRIMARY");

            entity.ToTable("POI_Operations");

            entity.HasIndex(e => e.PoiId, "POI_ID");

            entity.HasIndex(e => e.CityId, "POI_Operations_ibfk_1_idx");

            entity.HasIndex(e => e.OperationTypeId, "POI_Operations_ibfk_2");

            entity.HasIndex(e => e.CurrentState, "POI_Operations_ibfk_5");

            entity.Property(e => e.TicketId)
                .ValueGeneratedOnAdd()
                .HasColumnName("Ticket_ID");
            entity.Property(e => e.CityId)
                .HasMaxLength(36)
                .HasColumnName("City_ID");
            entity.Property(e => e.CurrentState)
                .HasMaxLength(20)
                .HasColumnName("Current_State");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Latitude).HasPrecision(8, 6);
            entity.Property(e => e.Longitude).HasPrecision(9, 6);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.OperationTypeId)
                .HasMaxLength(20)
                .HasColumnName("Operation_Type_ID");
            entity.Property(e => e.PoiId).HasColumnName("POI_ID");
            entity.Property(e => e.Website).HasMaxLength(255);

            entity.HasOne(d => d.City).WithMany(p => p.PoiOperations)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("POI_Operations_ibfk_1");

            entity.HasOne(d => d.CurrentStateNavigation).WithMany(p => p.PoiOperations)
                .HasForeignKey(d => d.CurrentState)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("POI_Operations_ibfk_5");

            entity.HasOne(d => d.OperationType).WithMany(p => p.PoiOperations)
                .HasForeignKey(d => d.OperationTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("POI_Operations_ibfk_2");

            entity.HasOne(d => d.Poi).WithMany(p => p.PoiOperations)
                .HasForeignKey(d => d.PoiId)
                .HasConstraintName("POI_Operations_ibfk_4");

            entity.HasOne(d => d.Ticket).WithOne(p => p.PoiOperation)
                .HasForeignKey<PoiOperation>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("POI_Operations_ibfk_6");
        });

        modelBuilder.Entity<PoiTheme>(entity =>
        {
            entity.HasKey(e => new { e.PoiId, e.Category })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("Poi_Themes");

            entity.HasIndex(e => e.Category, "Category");

            entity.Property(e => e.PoiId).HasColumnName("POI_ID");
            entity.Property(e => e.Category).HasMaxLength(20);

            entity.HasOne(d => d.CategoryNavigation).WithMany(p => p.PoiThemes)
                .HasForeignKey(d => d.Category)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Poi_Themes_ibfk_2");

            entity.HasOne(d => d.Poi).WithMany(p => p.PoiThemes)
                .HasForeignKey(d => d.PoiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Poi_Themes_ibfk_1");
        });

        modelBuilder.Entity<PointsOfInterest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Points_of_Interest");

            entity.HasIndex(e => e.Contributor, "Contributor");

            entity.HasIndex(e => e.Location, "Situated_idx");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Contributor).HasMaxLength(20);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Latitude).HasPrecision(8, 6);
            entity.Property(e => e.Location).HasMaxLength(36);
            entity.Property(e => e.Longitude).HasPrecision(9, 6);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Website).HasMaxLength(255);

            entity.HasOne(d => d.ContributorNavigation).WithMany(p => p.PointsOfInterests)
                .HasForeignKey(d => d.Contributor)
                .HasConstraintName("Points_of_Interest_ibfk_1");

            entity.HasOne(d => d.LocationNavigation).WithMany(p => p.PointsOfInterests)
                .HasForeignKey(d => d.Location)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Points_of_Interest_ibfk_2");

            entity.HasMany(d => d.Images).WithMany(p => p.Pois)
                .UsingEntity<Dictionary<string, object>>(
                    "PoiImage",
                    r => r.HasOne<Image>().WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Poi_Images_ibfk_2"),
                    l => l.HasOne<PointsOfInterest>().WithMany()
                        .HasForeignKey("PoiId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Poi_Images_ibfk_1"),
                    j =>
                    {
                        j.HasKey("PoiId", "ImageId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Poi_Images");
                        j.HasIndex(new[] { "ImageId" }, "Image_ID");
                        j.IndexerProperty<Guid>("PoiId").HasColumnName("POI_ID");
                        j.IndexerProperty<Guid>("ImageId").HasColumnName("Image_ID");
                    });
        });

        modelBuilder.Entity<PolicyPreference>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("Policy_Preferences");

            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");
            entity.Property(e => e.AdvancedProfiling).HasColumnName("Advanced_Profiling");
            entity.Property(e => e.DataSharingWithSocialNetworks).HasColumnName("Data_Sharing_with_Social_Networks");
            entity.Property(e => e.DataSharingWithThirdPartyCompanies).HasColumnName("Data_Sharing_with_Third_Party_Companies");
            entity.Property(e => e.DirectMarketing).HasColumnName("Direct_Marketing");

            entity.HasOne(d => d.User).WithOne(p => p.PolicyPreference)
                .HasForeignKey<PolicyPreference>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Policy_Preferences_ibfk_1");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.TripId, "FK_Trip");

            entity.HasIndex(e => e.PointOfInterestId, "Point_of_Interest_ID");

            entity.HasIndex(e => e.UserId, "Reviews_ibfk_1");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DateWritten).HasColumnName("Date_Written");
            entity.Property(e => e.PointOfInterestId).HasColumnName("Point_of_Interest_ID");
            entity.Property(e => e.Text).HasColumnType("text");
            entity.Property(e => e.TripId).HasColumnName("TripID");
            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");

            entity.HasOne(d => d.PointOfInterest).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.PointOfInterestId)
                .HasConstraintName("Reviews_ibfk_5");

            entity.HasOne(d => d.Trip).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.TripId)
                .HasConstraintName("FK_Trip");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Reviews_ibfk_1");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.Property(e => e.Value).HasMaxLength(20);
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.UserId, "Tickets_ibfk_1");

            entity.HasIndex(e => e.TicketType, "Tickets_ibfk_2");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.OpeningDate).HasColumnName("Opening_Date");
            entity.Property(e => e.TicketType).HasMaxLength(20);
            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");

            entity.HasOne(d => d.TicketTypeNavigation).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.TicketType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Tickets_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Tickets_ibfk_1");

            entity.HasMany(d => d.Categories).WithMany(p => p.Tickets)
                .UsingEntity<Dictionary<string, object>>(
                    "TicketTheme",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Ticket_Themes_ibfk_2"),
                    l => l.HasOne<Ticket>().WithMany()
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Ticket_Themes_ibfk_3"),
                    j =>
                    {
                        j.HasKey("TicketId", "CategoryId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Ticket_Themes");
                        j.HasIndex(new[] { "CategoryId" }, "CategoryID");
                        j.IndexerProperty<Guid>("TicketId").HasColumnName("TicketID");
                        j.IndexerProperty<string>("CategoryId")
                            .HasMaxLength(20)
                            .HasColumnName("CategoryID");
                    });

            entity.HasMany(d => d.Images).WithMany(p => p.Tickets)
                .UsingEntity<Dictionary<string, object>>(
                    "TicketImage",
                    r => r.HasOne<Image>().WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Ticket_Images_ibfk_2"),
                    l => l.HasOne<Ticket>().WithMany()
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Ticket_Images_ibfk_3"),
                    j =>
                    {
                        j.HasKey("TicketId", "ImageId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Ticket_Images");
                        j.HasIndex(new[] { "ImageId" }, "Image_ID");
                        j.IndexerProperty<Guid>("TicketId").HasColumnName("Ticket_ID");
                        j.IndexerProperty<Guid>("ImageId").HasColumnName("Image_ID");
                    });
        });

        modelBuilder.Entity<TicketType>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.ToTable("Ticket_Types");

            entity.Property(e => e.Value).HasMaxLength(20);
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.GroupId, "Trips_ibfk_1");

            entity.HasIndex(e => e.TripType, "Trips_ibfk_3");

            entity.HasIndex(e => e.UserId, "UserID");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreationDate).HasColumnName("Creation_Date");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.GroupId).HasColumnName("GroupID");
            entity.Property(e => e.IsPublic).HasColumnName("Is_Public");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.SuggestedUsersNumber).HasColumnName("Suggested_Users_Number");
            entity.Property(e => e.TripType).HasMaxLength(20);
            entity.Property(e => e.UserId)
                .HasMaxLength(20)
                .HasColumnName("UserID");

            entity.HasOne(d => d.Group).WithMany(p => p.Trips)
                .HasForeignKey(d => d.GroupId)
                .HasConstraintName("Trips_ibfk_1");

            entity.HasOne(d => d.TripTypeNavigation).WithMany(p => p.Trips)
                .HasForeignKey(d => d.TripType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trips_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.Trips)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("Trips_ibfk_2");
        });

        modelBuilder.Entity<TripChange>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PRIMARY");

            entity.ToTable("Trip_Changes");

            entity.HasIndex(e => e.GroupId, "Trip_Changes_ibfk_3");

            entity.HasIndex(e => e.Handler, "Trip_Changes_ibfk_4");

            entity.HasIndex(e => e.TripId, "Trip_Changes_ibfk_6");

            entity.Property(e => e.TicketId)
                .ValueGeneratedOnAdd()
                .HasColumnName("Ticket_ID");
            entity.Property(e => e.GroupId).HasColumnName("Group_ID");
            entity.Property(e => e.Handler).HasMaxLength(20);
            entity.Property(e => e.TripId).HasColumnName("Trip_ID");

            entity.HasOne(d => d.Group).WithMany(p => p.TripChanges)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Changes_ibfk_3");

            entity.HasOne(d => d.HandlerNavigation).WithMany(p => p.TripChanges)
                .HasForeignKey(d => d.Handler)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Changes_ibfk_4");

            entity.HasOne(d => d.Ticket).WithOne(p => p.TripChange)
                .HasForeignKey<TripChange>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Changes_ibfk_5");

            entity.HasOne(d => d.Trip).WithMany(p => p.TripChanges)
                .HasForeignKey(d => d.TripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Changes_ibfk_6");
        });

        modelBuilder.Entity<TripEdit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Trip_Edit");

            entity.HasIndex(e => e.OperationType, "Trip_Edit_ibfk_3");

            entity.HasIndex(e => e.PointOfInterestId, "Trip_Edit_ibfk_4");

            entity.HasIndex(e => e.TicketId, "Trip_Edit_ibfk_5");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.OperationType)
                .HasMaxLength(20)
                .HasColumnName("Operation_Type");
            entity.Property(e => e.PointOfInterestId).HasColumnName("Point_of_Interest_ID");
            entity.Property(e => e.TicketId).HasColumnName("Ticket_ID");

            entity.HasOne(d => d.OperationTypeNavigation).WithMany(p => p.TripEdits)
                .HasForeignKey(d => d.OperationType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Edit_ibfk_3");

            entity.HasOne(d => d.PointOfInterest).WithMany(p => p.TripEdits)
                .HasForeignKey(d => d.PointOfInterestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Edit_ibfk_4");

            entity.HasOne(d => d.Ticket).WithMany(p => p.TripEdits)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Trip_Edit_ibfk_5");
        });

        modelBuilder.Entity<TripType>(entity =>
        {
            entity.HasKey(e => e.Value).HasName("PRIMARY");

            entity.ToTable("Trip_Types");

            entity.Property(e => e.Value).HasMaxLength(20);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Username).HasName("PRIMARY");

            entity.Property(e => e.Username).HasMaxLength(20);
            entity.Property(e => e.CreationDate).HasColumnName("Creation_Date");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasColumnName("Is_Active");
            entity.Property(e => e.Password)
                .HasMaxLength(64)
                .IsFixedLength();
            entity.Property(e => e.ProfilePicture)
                .HasColumnType("blob")
                .HasColumnName("Profile_Picture");

            entity.HasMany(d => d.Categories).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Preference",
                    r => r.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Preferences_ibfk_2"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Preferences_ibfk_3"),
                    j =>
                    {
                        j.HasKey("UserId", "CategoryId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Preferences");
                        j.HasIndex(new[] { "CategoryId" }, "CategoryID");
                        j.IndexerProperty<string>("UserId")
                            .HasMaxLength(20)
                            .HasColumnName("UserID");
                        j.IndexerProperty<string>("CategoryId")
                            .HasMaxLength(20)
                            .HasColumnName("CategoryID");
                    });

            entity.HasMany(d => d.GroupsNavigation).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Membership",
                    r => r.HasOne<Group>().WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Memberships_ibfk_2"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Memberships_ibfk_1"),
                    j =>
                    {
                        j.HasKey("UserId", "GroupId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Memberships");
                        j.HasIndex(new[] { "GroupId" }, "Memberships_ibfk_2");
                        j.IndexerProperty<string>("UserId")
                            .HasMaxLength(20)
                            .HasColumnName("UserID");
                        j.IndexerProperty<Guid>("GroupId").HasColumnName("GroupID");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
