import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layout/default-layout";
import { Separator } from "@/components/ui/separator";
import POICard from "@/components/poi-card";
import useDbContext from "@/lib/useDbContext";
import { useAuth } from "@/auth/AuthContext";

export default function MyPois() {
  const [pois, setPois] = useState([{
    id: "0",
    name: "Colosseum",
    description: "Ancient Roman gladiatorial arena and iconic ruin.",
    website: "https://www.coopculture.it/en/colosseo-e-shop.cfm",
    longitude: 12.4922,
    latitude: 41.8902,
    contributor: null,
    location: "59582",
    activities: [
      {
        id: "38c16c88-2848-4770-838b-412ef1c3d689",
        name: "Test History",
        description: "Test Activity",
        duration: 45,
        minPrice: 5,
        maxPrice: 10,
        pointOfInterestId: "4a545017-67a2-47e4-b9b7-c55441c75ed7",
        activityOperations: [],
        categories: [
          {
            value: "History",
            description: "Studio degli eventi, delle civiltà e dei personaggi che hanno modellato il passato umano.",
            interests: [],
            poiThemes: [],
            activities: [],
            tickets: [],
            users: []
          }
        ]
      }
    ],
    contributorNavigation: null,
    itineraries: [],
    locationNavigation: {
      id: "59582",
      name: "Rome",
      longitude: 12.51133,
      latitude: 41.89193,
      countryCode: "IT",
      countryCodeNavigation: null,
      people: [],
      poiOperations: [],
      pointsOfInterests: []
    },
    poiOperations: [],
    poiThemes: [
      {
        poiId: "4a545017-67a2-47e4-b9b7-c55441c75ed7",
        category: "Art",
        weight: 3,
        categoryNavigation: null
      }
    ],
    reviews: [
      {
        id: "42ee87ba-d913-4d5c-b2dc-17d5f52ec844",
        text: "My family trip to Disneyland Paris was not what we expected. The kids were frustrated with how long we had to wait for rides, and the park felt chaotic.",
        rating: 1,
        dateWritten: "2022-04-19",
        userId: "askein4a",
        tripId: null,
        pointOfInterestId: "4a545017-67a2-47e4-b9b7-c55441c75ed7",
        trip: null,
        user: null
      }
    ],
    tripEdits: [],
    images: []
  }]);

  const [loading, setLoading] = useState(true);
  const dbInfo = useDbContext()
  // const { user } = useAuth()

  useEffect(() => {
    fetch(dbInfo.baseAddress().concat("/my-pois?username=yvaninr"))
      .then((res) => res.json())
      .then((data) => {
        setPois(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-5xl text-center">
        I miei <span className="font-bold">punti di interesse</span>
      </h1>
      <Separator className="mt-3 mb-5" />
      <div className="grid gap-5">
        {loading ? (
          <p>Caricamento in corso...</p>
        ) : pois[0].id === "0" ? (
          <p>Nessun punto di interesse trovato.</p>
        ) : (
          pois.map((poi) => (
            <POICard key={poi.id} showOrder={false} poi={poi} />
          ))
        )}
      </div>
    </DefaultLayout>
  );
}
