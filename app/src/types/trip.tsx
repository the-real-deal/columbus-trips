export type Trip = {
  id: string;
  name: string;
  description: string;
  creationDate: string; // ISO string
  isPublic: boolean;
  suggestedUsersNumber: number;
  itineraries: Itinerary[];
  reviews: Review[];
};

export type Itinerary = {
  order: number;
  tripId: string,
  pointOfInterestId: string,
  pointOfInterest: PointOfInterest;
};

export type PointOfInterest = {
  id: string;
  name: string;
  description: string;
  location: string;
  images: Image[];
  activities: Activity[];
};

export type Image = {
  id: string;
  url: string;
};

export type Activity = {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceRange: string;
  themes: string[];
};

export type Review = {
  id: string;
  text: string;
  rating: number;
  dateWritten: string; // ISO string
  userId?: string;
};
