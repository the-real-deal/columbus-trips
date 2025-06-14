import DefaultLayout from "@/components/layout/default-layout";
import PopularTripsCard from "@/components/popular-trips/popular-trips-card";

export default function TripsView() {
    const trips = [ 1, 2, 3, 4 ]
    return <DefaultLayout>
        <h2 className="text-5xl">Tutti gli itinerari</h2>
        <hr className="my-4"/>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4">
            { trips.map(_ => <PopularTripsCard title="CIAOO" country="Ireland" pois_count={5}/>)}
        </div>
    </DefaultLayout>
}