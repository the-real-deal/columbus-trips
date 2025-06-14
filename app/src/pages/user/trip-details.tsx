import DefaultLayout from "@/components/layout/default-layout";
import POICard from "@/components/poi-card";
import ReviewCard from "@/components/review-card";
import ReviewForm from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HashIcon, Lock, MapPin, PenBox, PersonStanding } from "lucide-react";
import { useParams } from "react-router";

export default function Trip() {
    const { tripId } = useParams();
    return <DefaultLayout className="p-0">
        <div className="w-full overflow-hidden h-[87dvh] relative">
            <img src="/login-images/01.avif" className="object-center object-cover">
            </img>
            <section className="absolute bottom-0 py-10 px-15 backdrop-blur-sm bg-black/30">
                <h1 className="text-center text-5xl">Titolone {tripId}</h1>
                <small className="pt-2 text-center w-full block">Creato il { new Date().toDateString() } · <Lock className="inline scale-75"/> Privato</small>
                <div className="grid grid-cols-3">
                    <h4 className="pt-10 text-center text-xl"><HashIcon className="inline"/> numero tappe!</h4>
                    <h4 className="pt-10 text-center text-xl"><MapPin className="inline"/> italy</h4>
                    <h4 className="pt-10 text-center text-xl"><PersonStanding className="inline"/> 5 persone</h4>
                </div>
                    <h4 className="pt-10 text-center text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque at fugit a commodi numquam ab, quisquam excepturi recusandae distinctio ullam quis ipsam dolor reprehenderit modi corporis, perspiciatis molestias reiciendis.</h4>
            </section>
        </div>
        <section className="px-10 py-10">
            <div className="flex justify-between">
                <h1 className="text-start text-5xl">Recensioni</h1>
                <Button className="inline-flex my-auto" onClick={() => console.log("caio")}><PenBox/> Lascia una recensione</Button>
            </div>
            <Separator className="mt-3 mb-5"/>
            <ReviewForm onSubmit={() => {}}></ReviewForm>
            <Separator className="mt-3 mb-5"/>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 justify-center">
                { [...Array(10).keys()].map(_ => 
                    <ReviewCard/>
                )}
            </div>
        </section>
        <section className="px-10 pb-10">
            <h1 className="text-start text-5xl">Tappe previste</h1>
            <Separator className="mt-3 mb-5"/>
            <div className="grid gap-5">
                { [...Array(10).keys()].map(_ => 
                    <POICard showOrder={true}/>
                )}
            </div>
        </section>
    </DefaultLayout>
}