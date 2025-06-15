import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

type ActivityCardProps = {
  activity: {
    name: string;
    description: string;
    duration: string;
    priceRange: string;
    themes: string[];
  };
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="pt-6 pb-0">
      <div className="xl:grid xl:grid-cols-2">
        <CardHeader>
          <h3 className="text-2xl">{activity.name}</h3>
          <div className="flex gap-3 mb-auto mt-1 lg:mt-0">
            {activity.themes.map((theme, idx) => (
              <Badge key={idx}># {theme}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {activity.description}
        </CardContent>
      </div>
      <CardFooter className="bg-gray-700 py-3 flex flex-col items-start rounded-b-xl">
        <p>· <span className="font-bold">Durata</span>: {activity.duration}</p>
        <p>· <span className="font-bold">Range di prezzo</span>: {activity.priceRange}</p>
      </CardFooter>
    </Card>
  );
}
