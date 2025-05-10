import DefaultLayout from "@/components/layout/default-layout";
import POICard from "@/components/poi-card";
import ReviewCard from "@/components/review-card";
import { Separator } from "@/components/ui/separator";
import { HashIcon, MapPin, PersonStanding } from "lucide-react";
import { useParams } from "react-router";

export default function Trip() {
    const { tripId } = useParams();
    return <DefaultLayout className="p-0">
        <div className="w-full overflow-hidden h-120 relative">
            <img src="/login-images/01.avif" className="object-center object-cover">
            </img>
            <section className="absolute bottom-0 py-10 px-15 backdrop-blur-sm bg-black/30">
                <h1 className="text-center text-5xl">Titolone {tripId}</h1>
                <small className="pt-2 text-center w-full block">Creato il { new Date().toDateString() } </small>
                <div className="grid grid-cols-3">
                    <h4 className="pt-10 text-center text-xl"><HashIcon className="inline"/> numero tappe!</h4>
                    <h4 className="pt-10 text-center text-xl"><MapPin className="inline"/> italy</h4>
                    <h4 className="pt-10 text-center text-xl"><PersonStanding className="inline"/> 5 persone</h4>
                </div>
                    <h4 className="pt-10 text-center text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque at fugit a commodi numquam ab, quisquam excepturi recusandae distinctio ullam quis ipsam dolor reprehenderit modi corporis, perspiciatis molestias reiciendis.</h4>
            </section>
        </div>
        <section className="px-10 py-10">
            <h1 className="text-start text-5xl">Recensioni </h1>
            <Separator className="mt-3 mb-5"/>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                { [...Array(10).keys()].map(_ => 
                    <ReviewCard/>
                )}
            </div>
        </section>
        <section className="px-10 pb-10">
            <h1 className="text-start text-5xl">Tappe previste </h1>
            <Separator className="mt-3 mb-5"/>
            <div className="grid gap-5">
                { [...Array(10).keys()].map(_ => 
                    <POICard />
                )}
            </div>
        </section>
    </DefaultLayout>
}