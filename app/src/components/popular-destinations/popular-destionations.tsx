import PopularDestinationCard from "@/components/popular-destinations/popular-destination-card";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import useDbContext from "@/lib/useDbContext";

type PopularDestinationsProps = {
    className?: string;
};

type Poi = {
    id: string;
    name: string;
    averageRating: number;
};

export default function PopularDestinations({ className }: PopularDestinationsProps) {
    const [popularPois, setPopularPois] = useState<Poi[]>([]);
    const [loading, setLoading] = useState(true);
    const dbInfo = useDbContext();

    useEffect(() => {
        fetch(dbInfo.baseAddress().concat("/Statistics/best-pois/"))
            .then((res) => res.json())
            .then((data: Poi[]) => {
                setPopularPois(data);
            })
            .catch((err) => {
                console.error("Errore nel recupero dei POI:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className={className}>
            <h2 className="text-5xl">Destinazioni più popolari</h2>
            <Separator className="mt-2 mb-5" />
            {loading ? (
                <p>Caricamento in corso...</p>
            ) : (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
                    {popularPois.map((poi) => (
                        <PopularDestinationCard
                            country={poi.name}
                            poi_rating={poi.averageRating}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
