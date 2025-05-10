import { Separator } from "../ui/separator"
import PopularSingleTripsCard from "./popular-single-trips-card"

type PopularTripsProps = {
    className?: string
}

export default function PopularTrips({ className }: PopularTripsProps) {
    return <section className={className}>
        <h2 className="text-5xl">Gli itinerari più quotati</h2>
        <Separator className="mt-2 mb-5"/>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
            <PopularSingleTripsCard title="Sentiero di Dio" country="Italy" pois_count={5}/>
        </div>
    </section>
}