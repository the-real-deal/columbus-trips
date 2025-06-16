import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layout/default-layout";
import PopularTripsCard from "@/components/popular-trips/popular-trips-card";
import useDbContext from "@/lib/useDbContext";

type Trip = {
    id: string;
    name: string;
    description: string;
    tripType: string;
    creationDate: string;
    isPublic: boolean;
    suggestedUsersNumber: number;
    userId: string;
};

export default function TripsView() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const dbInfo = useDbContext();
    useEffect(() => {
        fetch(dbInfo.baseAddress().concat("/Trip/public-itineraries"))
            .then((res) => res.json())
            .then((data: Trip[]) => {
                setTrips(data);
            })
            .catch((err) => {
                console.error("Errore nel caricamento degli itinerari pubblici:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <DefaultLayout>
            <h2 className="text-5xl">Tutti gli itinerari</h2>
            <hr className="my-4" />
            {loading ? (
                <p>Caricamento itinerari...</p>
            ) : trips.length === 0 ? (
                <p>Nessun itinerario pubblico disponibile.</p>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-3">
                    {trips.map((trip) => (
                        <PopularTripsCard
                            people_count={trip.suggestedUsersNumber}
                            title={trip.name}
                            id={trip.id}
                        />
                    ))}
                </div>
            )}
        </DefaultLayout>
    );
}
