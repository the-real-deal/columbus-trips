import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Trip } from "@/types/trip";
import DefaultLayout from "@/components/layout/default-layout";
import POICard from "@/components/poi-card";
import ReviewCard from "@/components/review-card";
import ReviewForm from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HashIcon, Lock, MapPin, PenBox, PersonStanding } from "lucide-react";
import useDbContext from "@/lib/useDbContext";

export default function Trip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);
    const dbInfo = useDbContext()

    useEffect(() => {
        fetch(`${dbInfo.baseAddress()}/Trip/trip-details?tripID=${tripId}`)
            .then(res => res.json())
            .then(data => setTrip(data));
    }, [tripId]);

    if (!trip) return <p>Loading...</p>;

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
                    <div className="grid grid-cols-3">
                        <h4 className="pt-10 text-center text-xl"><HashIcon className="inline" /> {trip.itineraries.length} tappe</h4>
                        <h4 className="pt-10 text-center text-xl"><MapPin className="inline" /> {trip.itineraries[0]?.pointOfInterest.location || "N/D"}</h4>
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
                <ReviewForm onSubmit={() => { }} />
                <Separator className="mt-3 mb-5" />
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 justify-center">
                    {trip.reviews.map(review =>
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
