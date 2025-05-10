import { Star } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { useState } from "react"

export default function ReviewCard() {
    const [ showMore, setShowMore ] = useState(false)
    return <Card>
        <CardHeader>
            <div className="flex justify-between">
                <p>Sandra Milandra</p>
                <div className="flex gap-1">
                    { [ ...Array(Math.floor((Math.random()) * 5)).keys() ].map(_ => 
                        <Star/>
                    )}
                </div>
            </div>
            <small className="text-gray-500">{ new Date().toDateString() }</small>
        </CardHeader>
        <CardContent className={`${!showMore && "truncate"}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Consectetur et mollitia iusto quo, repudiandae tempore commodi eos quibusdam, 
            aliquam libero ut. Atque iste excepturi vitae, fugiat magnam optio sapiente? Doloremque?
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button variant={"link"} onClick={() => setShowMore(!showMore)}>
                Show { showMore ? "less" : "more" }
            </Button>
        </CardFooter>
    </Card>
}