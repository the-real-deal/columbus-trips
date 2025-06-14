import PopularDestinationCard from "@/components/popular-destinations/popular-destination-card";
import { Separator } from "../ui/separator";

type PopularDestinationsProps = {
    className?: string
}

export default function PopularDestinations({ className }: PopularDestinationsProps) {
    return <section className={className}>
        <h2 className="text-5xl">Destinazioni più popolari</h2>
        <Separator className="mt-2 mb-5"/>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
            <PopularDestinationCard trips_count={3}  country="italy"/>
            <PopularDestinationCard trips_count={3} country="italy"/>
            <PopularDestinationCard trips_count={3} country="italy"/>
            <PopularDestinationCard trips_count={3} country="italy"/>
            <PopularDestinationCard trips_count={3} country="italy"/>
            <PopularDestinationCard trips_count={3} country="italy"/>
        </div>
    </section>
}