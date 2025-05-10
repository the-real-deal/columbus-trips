import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { InterestChart } from "./interest-chart";

type POICardProps = {
    className?: string
}

export default function POICard({ className }: POICardProps) {
    return <Card className={className}>
        <CardHeader>
            <Badge>
                <MapPin className="inline"/> Dublin
            </Badge>
        </CardHeader>
        <CardContent className="px-0">
            <div className="w-full h-70 overflow-hidden">
                <img src="/login-images/05.avif" className="object-center object-cover" />
            </div>
            <section className="px-10 grid grid-cols-2">
                <div className="py-5">
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                    <div>ti gray</div>
                </div>
                <InterestChart className="my-auto"/>
            </section>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
}