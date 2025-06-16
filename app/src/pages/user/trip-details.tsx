import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Trip } from "@/types/trip";
import DefaultLayout from "@/components/layout/default-layout";
import POICard from "@/components/poi-card";
import ReviewCard from "@/components/review-card";
import ReviewForm from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HashIcon, Lock, PenBox, PersonStanding } from "lucide-react";
import useDbContext from "@/lib/useDbContext";
import { useAuth } from "@/auth/AuthContext";

export default function Trip() {
    const { tripId } = useParams();
    const { user } = useAuth()

    const [trip, setTrip] = useState({
        id: "0",
        name: "Exploring Berlin with Friends",
        description: "A fun and adventurous trip exploring Berlin's nightlife and culture.",
        tripType: "Group",
        creationDate: "2025-06-15",
        isPublic: true,
        suggestedUsersNumber: 4,
        groupId: "c68f4775-24d8-4b9c-8724-af0e1688e204",
        userId: null,
        group: null,
        itineraries: [
            {
                order: 2,
                tripId: "9f0f2e40-181d-4828-aa29-efd29df78092",
                pointOfInterestId: "19b630a0-07ec-4e46-bb1f-c9c89cc86d79",
                pointOfInterest: {
                    id: "19b630a0-07ec-4e46-bb1f-c9c89cc86d79",
                    name: "Eiffel Tower",
                    description: "Wrought-iron lattice tower on the Champ de Mars.",
                    website: "https://www.toureiffel.paris/en",
                    longitude: 2.2945,
                    latitude: 48.8584,
                    contributor: null,
                    location: "44856",
                    activities: [],
                    contributorNavigation: null,
                    itineraries: [],
                    locationNavigation: null,
                    poiOperations: [],
                    poiThemes: [],
                    reviews: [],
                    tripEdits: [],
                    images: []
                }
            }
        ],
        reviews: [
            {
                id: "5f4e745e-4665-4c68-8b77-74df6d228666",
                text: "The Alps hike was tough, but I was disappointed by how poorly organized the trip was. Some parts felt unsafe, and the group wasn’t as friendly as I’d hoped.",
                rating: 1,
                dateWritten: "2022-04-28",
                userId: "adressell2m",
                tripId: "9f0f2e40-181d-4828-aa29-efd29df78092",
                pointOfInterestId: null,
                pointOfInterest: null,
                user: null
            }
        ],
        tripChanges: [],
        tripTypeNavigation: null,
        user: null
    });

    const dbInfo = useDbContext()

    useEffect(() => {
        fetch(`${dbInfo.baseAddress()}/Trip/trip-details?tripID=${tripId}`)
            .then(res => res.json())
            .then(data => {
                setTrip(data)

            });
    }, [tripId]);

    if (trip.id === "0") return <p>Loading...</p>;

    return (
        <DefaultLayout className="p-0">
            <div className="w-full overflow-hidden h-[87dvh] relative">
                <img src="/login-images/01.avif" className="object-center object-cover" />
                <section className="absolute bottom-0 py-10 px-15 backdrop-blur-sm bg-black/30 text-white">
                    <h1 className="text-center text-5xl">{trip.name}</h1>
                    <small className="pt-2 text-center w-full block">
                        Creato il {new Date(trip.creationDate).toLocaleDateString()} ·{" "}
                        {trip.isPublic ? "Pubblico" : <><Lock className="inline scale-75" /> Privato</>}
                    </small>
                    <div className="grid grid-cols-2">
                        <h4 className="pt-10 text-center text-xl"><HashIcon className="inline" /> {trip.itineraries.length} tappe</h4>
                        {/* <h4 className="pt-10 text-center text-xl"><MapPin className="inline" /> {trip.itineraries[0]?.pointOfInterest.locationNavigation?.name || "N/D"}</h4> */}
                        <h4 className="pt-10 text-center text-xl"><PersonStanding className="inline" /> {trip.suggestedUsersNumber} persone</h4>
                    </div>
                    <h4 className="pt-10 text-center text-xl">{trip.description}</h4>
                </section>
            </div>

            <section className="px-10 py-10">
                <div className="flex justify-between">
                    <h1 className="text-start text-5xl">Recensioni</h1>
                    <Button className="inline-flex my-auto"><PenBox /> Lascia una recensione</Button>
                </div>
                <Separator className="mt-3 mb-5" />
                <ReviewForm
                    tripId={trip.id}
                    userId={user || "mock-user-id"}
                    onSuccess={() => {
                        // Ricarica dati del trip per aggiornare le recensioni
                        fetch(`${dbInfo.baseAddress()}/Trip/trip-details?tripID=${tripId}`)
                            .then(res => res.json())
                            .then(data => setTrip(data));
                    }}
                />

                <Separator className="mt-3 mb-5" />
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 justify-center">
                    {trip.reviews.map((review: any) =>
                        <ReviewCard key={review.id} review={review} />
                    )}
                </div>
            </section>

            <section className="px-10 pb-10">
                <h1 className="text-start text-5xl">Tappe previste</h1>
                <Separator className="mt-3 mb-5" />
                <div className="grid gap-5">
                    {[...trip.itineraries]
                        .sort((a, b) => a.order - b.order)
                        .map(itinerary =>
                            <POICard
                                key={itinerary.pointOfInterest.id}
                                showOrder={true}
                                order={itinerary.order}
                                poi={itinerary.pointOfInterest}
                            />
                        )}
                </div>
            </section>
        </DefaultLayout>
    );
}
