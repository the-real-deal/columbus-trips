import { MapPin, Hash } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import PoiThemesChart from "./interest-chart";
import ActivityCard from "./activity-card";

export default function POICard({ className, showOrder, order, poi }: any) {
  console.log(poi)
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-3">
        {showOrder && <Badge><Hash className="inline" /> Tappa numero {order}</Badge>}
        <Badge><MapPin className="inline" /> {poi.name}, {poi.locationNavigation.name}</Badge>
      </CardHeader>
      <CardContent className="px-0">
        <div className="w-full h-70 overflow-hidden">
          <img src={poi.images[0]?.url || import.meta.env.BASE_URL.concat("login-images/05.avif")} className="object-center object-cover w-full h-full" />
        </div>
        <section className="px-10 grid grid-cols-3 py-3">
          <div className="py-5 col-span-2">
            {poi.description}
            <h3 className="mt-5 text-3xl py-1 ps-3 border-l-5 border-[var(--primary)] bg-(--primary)/10">Attività previste</h3>
            <div className="grid gap-3 py-5">
              {poi.activities.length == 0 ? <p>Ancora nessuna attività.</p> : poi.activities.map((activity: any, idx: number) => (
                <ActivityCard key={idx} activity={activity} />
              ))}
            </div>
          </div>
          <PoiThemesChart className="col-span-1" data={poi.poiThemes} />
        </section>
      </CardContent>
    </Card>
  );
}