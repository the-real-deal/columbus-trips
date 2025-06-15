import DefaultLayout from "@/components/layout/default-layout";
import PopularTripsCard from "@/components/popular-trips/popular-trips-card";
import useDbContext from "@/lib/useDbContext";
import { useEffect, useState } from "react";

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

export default function MyTrips() {
    const [myTrips, setMyTrips] = useState([1, 2, 4])

    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const dbInfo = useDbContext();
    const username = "PaoloBitta77"
    useEffect(() => {
        fetch(dbInfo.baseAddress().concat("/Trip/my-trips?username=" + username))
            .then((res) => res.json())
            .then((data: Trip[]) => {
                setTrips(data);
            })
            .catch((err) => {
                console.error("Errore nel caricamento degli propri itinerari:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const userTrips = [] as Trip[]
    const grupTrips = [] as Trip[]
    trips.forEach(t => {
        if (t.tripType === "Group") {
            grupTrips.push(t)
        } else {
            userTrips.push(t)
        }
    })
    // useEffect(() => {
    //     fetch(dbInfo.baseAddress().concat("/Trip/my-trips?username=" + username))
    //         .then((res) => res.json())
    //         .then((data: Trip[]) => {
    //             setTrips(data);
    //         })
    //         .catch((err) => {
    //             console.error("Errore nel caricamento degli propri itinerari:", err);
    //         })
    //         .finally(() => setLoading(false));
    // }, []);

    return <DefaultLayout>
        <h1 className="text-5xl text-center">I miei <span className="font-bold">itinerari</span></h1>
        <h2 className="text-3xl">Singoli</h2>
        <section className="py-5">
            {
                userTrips.length === 0 ?
                    "Nessun itinerario da mostrare!" :
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
                        {
                            userTrips.map(trip => <PopularTripsCard id={trip.id} title={trip.name} people_count={trip.suggestedUsersNumber} pois_count={2} />)
                        }
                    </div>
            }
        </section>
        <hr className="py-3" />
        <h2 className="text-3xl">Di gruppo</h2>
        <section className="py-5">
            {
                grupTrips.length === 0 ?
                    "Nessun itinerario da mostrare!" :
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
                        {
                            grupTrips.map(trip => <PopularTripsCard id={trip.id} title={trip.name} people_count={trip.suggestedUsersNumber} pois_count={2} />)
                        }
                    </div>
            }
        </section>
    </DefaultLayout>
}