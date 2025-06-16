import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DefaultLayout from "@/components/layout/default-layout";
import POICard from "@/components/poi-card";
import ReviewCard from "@/components/review-card";
import ReviewForm from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, PenBox, FlipHorizontal2, FlipVertical2 } from "lucide-react";
import useDbContext from "@/lib/useDbContext";

export default function Poi() {
    const { poiId } = useParams();
    const [poi, setTrip] = useState({
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
    }
    );
    const dbInfo = useDbContext()

    useEffect(() => {
        fetch(`${dbInfo.baseAddress()}/poi-details?id=${poiId}`)
            .then(res => res.json())
            .then(data => {
                setTrip(data)

            });
    }, [poiId]);

    if (poi.id === "0") return <p>Loading...</p>;

    return (
        <DefaultLayout className="p-0">
            <div className="w-full overflow-hidden h-[87dvh] relative">
                <img src="/login-images/01.avif" className="object-center object-cover" />
                <section className="absolute bottom-0 py-10 px-15 backdrop-blur-sm bg-black/30 text-white">
                    <h1 className="text-center text-5xl">{poi.name}</h1>
                    <small className="pt-2 text-center w-full block">
                        Aggiunto da: {poi.contributor ?? "Admin"}
                    </small>
                    <div className="grid grid-cols-3">
                        <h4 className="pt-10 text-center text-xl"><FlipVertical2 className="inline" />Longitudine: {poi.longitude} </h4>
                        <h4 className="pt-10 text-center text-xl"><FlipHorizontal2 className="inline" /> Latitudine: {poi.latitude}</h4>
                        <h4 className="pt-10 text-center text-xl"><MapPin className="inline" /> {poi.locationNavigation.name}</h4>
                    </div>
                    <h4 className="pt-10 text-center text-xl">{poi.description}</h4>
                </section>
            </div>

            <section className="px-10 py-10">
                <div className="flex justify-between">
                    <h1 className="text-start text-5xl">Recensioni</h1>
                    <Button className="inline-flex my-auto"><PenBox /> Lascia una recensione</Button>
                </div>
                <Separator className="mt-3 mb-5" />
                {/* <ReviewForm onSubmit={() => { }} /> */}
                <Separator className="mt-3 mb-5" />
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 justify-center">
                    {poi.reviews.map((review: any) =>
                        <ReviewCard key={review.id} review={review} />
                    )}
                </div>
            </section>

            <section className="px-10 pb-10">
                <h1 className="text-start text-5xl">Dettagli</h1>
                <Separator className="mt-3 mb-5" />
                <div className="grid gap-5">
                    <POICard
                        key={poi.id}
                        showOrder={false}
                        order={0}
                        poi={poi}
                    />
                </div>
            </section>
        </DefaultLayout>
    );
}
