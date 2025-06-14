import DefaultLayout from "@/components/layout/default-layout";
import { Separator } from "@/components/ui/separator";
import POICard from "@/components/poi-card";

export default function MyPois() {
    return <DefaultLayout>
        <h1 className="text-5xl text-center">I miei <span className="font-bold">punti di interesse</span></h1>
        <Separator className="mt-3 mb-5"/>
            <div className="grid gap-5">
                { [...Array(10).keys()].map(_ => 
                    <POICard showOrder={false}/>
                )}
            </div>
    </DefaultLayout>
}