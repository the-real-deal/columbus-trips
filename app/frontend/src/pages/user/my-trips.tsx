import DefaultLayout from "@/components/layout/default-layout";
import PopularTripsCard from "@/components/popular-trips/popular-trips-card";
import { useState } from "react";

export default function MyTrips() {
    const [ myTrips, setMyTrips ] = useState([1, 2, 4])
    return <DefaultLayout>
        <h1 className="text-5xl text-center">I miei <span className="font-bold">itinerari</span></h1>
        <h2 className="text-3xl">Singoli</h2>
        <section className="py-5">
            {
                myTrips.length === 0 ?
                "Nessun itinerario da mostrare!" :
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
                    {
                        myTrips.map(_ => <PopularTripsCard title="" country="" pois_count={0}/>)
                    }
                </div>
            }
        </section>
        <hr className="py-3"/>
        <h2 className="text-3xl">Di gruppo</h2>
        <section className="py-5">
            {
                myTrips.length === 0 ?
                "Nessun itinerario da mostrare!" :
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
                    {
                        myTrips.map(_ => <PopularTripsCard title="" country="" pois_count={0}/>)
                    }
                </div>
            }
        </section>
    </DefaultLayout>
}