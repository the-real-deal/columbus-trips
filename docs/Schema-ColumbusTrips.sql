DROP DATABASE IF EXISTS ColumbusTrips;

CREATE DATABASE IF NOT EXISTS ColumbusTrips;

USE ColumbusTrips;

CREATE TABLE Users (
    Username VARCHAR(20) PRIMARY KEY,
    Email VARCHAR(100) NOT NULL,
    Password CHAR(60) NOT NULL,
    Creation_Date DATE NOT NULL,
    Is_Active BOOLEAN NOT NULL,
    Profile_Picture BLOB
);

CREATE TABLE Policy_Preferences (
    UserID VARCHAR(20) PRIMARY KEY,
    Advanced_Profiling BOOLEAN,
    Direct_Marketing BOOLEAN,
    Data_Sharing_with_Third_Party_Companies BOOLEAN,
    Data_Sharing_with_Social_Networks BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES Users(Username)
);

CREATE TABLE Nations (
    ISO2 CHAR(2) PRIMARY KEY,
    Name VARCHAR(255),
    Phone_Code VARCHAR(10),
    Currency CHAR(3),
    Currency_Name VARCHAR(50)
);

CREATE TABLE Cities (
    ID CHAR(36) PRIMARY KEY,
    Name VARCHAR(255),
    Longitude DECIMAL(9,6),
    Latitude DECIMAL(8,6),
    CountryCode CHAR(2),
    FOREIGN KEY (Nation_ID) REFERENCES Nations(ISO2)
);

CREATE TABLE People (
    Document_Number VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255),
    BirthDate DATE,
    UserID VARCHAR(20),
    Residence_City CHAR(36),
    Street VARCHAR(255),
    Street_Number INT,
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (Residence_City) REFERENCES Cities(ID)
);

CREATE TABLE Points_of_Interest (
    ID CHAR(36) PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Website VARCHAR(255),
    Longitude DECIMAL(9,6),
    Latitude DECIMAL(8,6),
    Contributor VARCHAR(20),
    Location CHAR(36),
    FOREIGN KEY (Contributor) REFERENCES Users(Username),
    FOREIGN KEY (Location) REFERENCES Cities(ID)
);

CREATE TABLE Ticket_Types (
    Value VARCHAR(20) PRIMARY KEY
);

CREATE TABLE Tickets (
    ID VARCHAR(36) PRIMARY KEY,
    Opening_Date DATE,
    Result BOOLEAN,
    UserID VARCHAR(20),
    TicketType VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (TicketType) REFERENCES Ticket_Types(Value)
);

CREATE TABLE Group_Types (
    Value VARCHAR(20) PRIMARY KEY
);

CREATE TABLE `Groups` (
    ID CHAR(36) PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Group_Picture BLOB,
    Group_Type VARCHAR(20),
    Leader CHAR(36),
    FOREIGN KEY (Group_Type) REFERENCES Group_Types(Value),
    FOREIGN KEY (Leader) REFERENCES Users(Username)
);

CREATE TABLE Categories (
    Value VARCHAR(20) PRIMARY KEY,
    Description VARCHAR(255)
);

CREATE TABLE Ticket_Themes (
    TicketID CHAR(36),
    CategoryID VARCHAR(20),
    PRIMARY KEY (TicketID, CategoryID),
    FOREIGN KEY (TicketID) REFERENCES Tickets(ID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(Value)
);

CREATE TABLE Trip_Types (
    Value VARCHAR(20) PRIMARY KEY
);

CREATE TABLE Trips (
    ID VARCHAR(36) PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    TripType VARCHAR(20),
    Creation_Date DATE,
    Is_Public BOOLEAN,
    Suggested_Users_Number INT,
    GroupID CHAR(36),
    UserID VARCHAR(20),
    FOREIGN KEY (GroupID) REFERENCES `Groups`(ID),
    FOREIGN KEY (UserID) REFERENCES Users (Username),
    FOREIGN KEY (TripType) REFERENCES Trip_Types(Value)
);

CREATE TABLE Itinerary (
    `Order` INT CHECK (`Order` > 0),
    Trip_ID CHAR(36),
    Point_of_Interest_ID CHAR(36),
    FOREIGN KEY (Trip_ID) REFERENCES Trips(ID),
    FOREIGN KEY (Point_of_Interest_ID) REFERENCES Points_of_Interest(ID),
	PRIMARY KEY (Trip_ID, Point_of_Interest_ID)
);

CREATE TABLE Interests (
    CategoryID VARCHAR(20),
    GroupID CHAR(36),
    PRIMARY KEY (CategoryID, GroupID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(Value),
    FOREIGN KEY (GroupID) REFERENCES `Groups`(ID)
);

CREATE TABLE Preferences (
    UserID CHAR(36),
    CategoryID VARCHAR(20),
    PRIMARY KEY (UserID, CategoryID),
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (CategoryID) REFERENCES Categories(Value)
);

CREATE TABLE Join_Request (
    TicketID CHAR(36) PRIMARY KEY,
    GroupID CHAR(36),
    FOREIGN KEY (TicketID) REFERENCES Tickets(ID),
    FOREIGN KEY (GroupID) REFERENCES `Groups`(ID)
);

CREATE TABLE Invite (
    TicketID CHAR(36) PRIMARY KEY,
    UserID VARCHAR(20),
    GroupID CHAR(36),
    FOREIGN KEY (TicketID) REFERENCES Tickets(ID),
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (GroupID) REFERENCES `Groups`(ID)
);

CREATE TABLE Memberships (
    UserID VARCHAR(20),
    GroupID CHAR(36),
    PRIMARY KEY (UserID, GroupID),
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (GroupID) REFERENCES `Groups`(ID)
);

CREATE TABLE Reviews (
    ID CHAR(36) PRIMARY KEY,
    Text TEXT,
    Rating TINYINT,
    CONSTRAINT check_rating CHECK (Rating >= 0 AND Rating <=5),
    Date_Written DATE,
    UserID VARCHAR(20),
    TripID CHAR(36),
    Point_of_Interest_ID CHAR(36),
    FOREIGN KEY (UserID) REFERENCES Users(Username),
    FOREIGN KEY (TripID) REFERENCES Trips(ID),
    FOREIGN KEY (Point_of_Interest_ID) REFERENCES Points_of_Interest(ID),
    CONSTRAINT check_xor CHECK ((TripID IS NULL) <> (Point_of_Interest_ID IS NULL))
);

CREATE TABLE Activities (
    ID CHAR(36) PRIMARY KEY,
    Name VARCHAR(60),
    Description TEXT,
    Duration INT,  /* Saved in minute */
    Min_Price INT,
    Max_Price INT, -- Saved in Cents
    Point_of_InterestID CHAR(36),
    FOREIGN KEY (Point_of_InterestID) REFERENCES Points_of_Interest(ID)
);

CREATE TABLE Activity_Themes (
    ActivityID CHAR(36),
    CategoryID VARCHAR(20),
    PRIMARY KEY (ActivityID, CategoryID),
    FOREIGN KEY (ActivityID) REFERENCES Activities(ID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(Value)
);

CREATE TABLE Operation_Types (
    Value VARCHAR(20) PRIMARY KEY
);

CREATE TABLE States (
    Value VARCHAR(20) PRIMARY KEY
);

CREATE TABLE Activity_Operations (
    TicketID CHAR(36) PRIMARY KEY,
    Current_State VARCHAR(20),
    Name VARCHAR(255),
    Description TEXT,
    Duration INT,
    Min_Price INT,
    Max_Price INT,
    ActivityID CHAR(36),
    Operation_Type VARCHAR(20),
    FOREIGN KEY (TicketID) REFERENCES Tickets(ID),
    FOREIGN KEY (ActivityID) REFERENCES Activities(ID),
    FOREIGN KEY (Operation_Type) REFERENCES Operation_Types(Value),
    FOREIGN KEY (Current_State) REFERENCES States(Value)
);

CREATE TABLE POI_Operations (
    Ticket_ID CHAR(36) PRIMARY KEY,
    Operation_Type_ID VARCHAR(20),
    City_ID CHAR(36),
    Name VARCHAR(255),
    Description TEXT,
    Website VARCHAR(255),
    Longitude DECIMAL(9,6),
    Latitude DECIMAL(8,6),
    POI_ID CHAR(36),
    Current_State VARCHAR(20),
    FOREIGN KEY (Ticket_ID) REFERENCES Tickets(ID),
    FOREIGN KEY (Operation_Type_ID) REFERENCES Operation_Types(Value),
    FOREIGN KEY (City_ID) REFERENCES Cities(ID),
    FOREIGN KEY (POI_ID) REFERENCES Points_of_Interest(ID),
    FOREIGN KEY (Current_State) REFERENCES States(Value)
);

CREATE TABLE Trip_Changes (
    Ticket_ID CHAR(36) PRIMARY KEY,
    Trip_ID CHAR(36),
    Group_ID CHAR(36),
    Handler VARCHAR(20),
    FOREIGN KEY (Ticket_ID) REFERENCES Tickets(ID),
    FOREIGN KEY (Trip_ID) REFERENCES Trips(ID),
    FOREIGN KEY (Group_ID) REFERENCES `Groups`(ID),
    FOREIGN KEY (Handler) REFERENCES Users(Username)
);

CREATE TABLE Trip_Edit (
    ID CHAR(36) PRIMARY KEY,
    Point_of_Interest_ID CHAR(36),
    Ticket_ID CHAR(36),
    `Order` INT,
    Operation_Type VARCHAR(20),
    FOREIGN KEY (Point_of_Interest_ID) REFERENCES Points_of_Interest(ID),
    FOREIGN KEY (Ticket_ID) REFERENCES Tickets(ID),
    FOREIGN KEY (Operation_Type) REFERENCES Operation_Types(Value)
);

CREATE TABLE Images (
    ID CHAR(36) PRIMARY KEY,
    Image BLOB
);

CREATE TABLE Ticket_Images (
    Ticket_ID CHAR(36),
    Image_ID CHAR(36),
    PRIMARY KEY (Ticket_ID, Image_ID),
    FOREIGN KEY (Ticket_ID) REFERENCES Tickets(ID),
    FOREIGN KEY (Image_ID) REFERENCES Images(ID)
);

CREATE TABLE Poi_Images (
    POI_ID CHAR(36),
    Image_ID CHAR(36),
    PRIMARY KEY (POI_ID, Image_ID),
    FOREIGN KEY (POI_ID) REFERENCES Points_of_Interest(ID),
    FOREIGN KEY (Image_ID) REFERENCES Images(ID)
);

CREATE TABLE Admins (
    Nickname VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Surname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password CHAR(60) NOT NULL
);

CREATE TABLE Admin_Stateful_Change (
    ID CHAR(36) PRIMARY KEY,
    Ticket_ID CHAR(36),
    State_Value VARCHAR(20),
    Date_Changed DATE,
    Admin VARCHAR(255),
    FOREIGN KEY (Ticket_ID) REFERENCES Tickets(ID),
    FOREIGN KEY (State_Value) REFERENCES States(Value),
    FOREIGN KEY (Admin) REFERENCES Admins(Nickname)
);
