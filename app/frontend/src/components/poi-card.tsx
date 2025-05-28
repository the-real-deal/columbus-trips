import { MapPin, Hash } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { InterestChart } from "./interest-chart";
import ActivityCard from "./activity-card";

type POICardProps = {
    className?: string,
    showOrder?: boolean
}

export default function POICard({ className, showOrder = false }: POICardProps) {
    return <Card className={className}>
        <CardHeader className="flex flex-row items-center">
            { showOrder && 
                <Badge className="bg-(--primary)/50">
                    <Hash className="inline"/> Tappa numero 1
                </Badge>
            }
            <Badge>
                <MapPin className="inline"/> Dublin
            </Badge>
        </CardHeader>
        <CardContent className="px-0">
            <div className="w-full h-70 overflow-hidden">
                <img src="/login-images/05.avif" className="object-center object-cover" />
            </div>
            <section className="px-10 grid grid-cols-3 py-3">
                <div className="py-5 col-span-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Velit voluptatum facilis reiciendis culpa nostrum harum unde saepe eaque, 
                    cumque non numquam aliquid rerum vitae corrupti accusantium! 
                    Maiores exercitationem corrupti vero.
                    <h3 className="mt-5 text-3xl py-1 ps-3 border-l-5 border-[var(--primary)] bg-(--primary)/10">Attività previste</h3>
                    <div className="grid gap-3 py-5">
                        <ActivityCard/>
                        <ActivityCard/>
                        <ActivityCard/>
                        <ActivityCard/>
                    </div>
                </div>
                <InterestChart className="col-span-1"/>
            </section>
        </CardContent>
    </Card>
}