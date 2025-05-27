import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function ActivityCard() {
    return <Card className="pt-6 pb-0">
        <div className="xl:grid xl:grid-cols-2">
            <CardHeader>
                <h3 className="text-2xl">Titolo dell'attività</h3>
                <div className="flex gap-3 mb-auto mt-1 lg:mt-0">
                    <Badge># Storia</Badge>
                    <Badge># Storia</Badge>
                    <Badge># Storia</Badge>
                    <Badge># Storia</Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, animi saepe, impedit quia nam eos dolores eius ullam fuga tempore, laudantium earum molestiae similique voluptate doloribus illo error quas accusamus.
            </CardContent>
        </div>
        <CardFooter className="bg-gray-700 py-3 flex flex-col items-start rounded-b-xl">
            <p>· <span className="font-bold">Durata</span>: 2h</p>
            <p>· <span className="font-bold">Range di prezzo</span>: 20€ - 100€</p>
        </CardFooter>
    </Card>
}