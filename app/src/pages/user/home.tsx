import DefaultLayout from "@/components/layout/default-layout";
import PopularDestinations from "@/components/popular-destinations/popular-destionations";
import PopularTrips from "@/components/popular-trips/popular-trips";

export default function Home() {
    return <DefaultLayout className="py-0">
        <PopularDestinations className="pt-5"/>
        <PopularTrips className="py-10"/>
    </DefaultLayout>
}