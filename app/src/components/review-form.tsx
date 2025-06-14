import { useState } from "react"
import { Card, CardHeader, CardContent } from "./ui/card"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

type Review = {
    author: string
    text: string
    rating: 1 | 2 | 3 | 4 | 5
    dateWritten: Date
}

type ReviewFormProps = {
    className?: string,
    onSubmit: () => void
}

export default function ReviewForm({ className, onSubmit }: ReviewFormProps) {
    const [ newReview, setNewReview ] = useState<Review>()
    const [ stars, setStars ] = useState<number>(1)

    return <Card className={cn(className)}>
        <form className="px-8 grid gap-y-5">
            <div className="grid gap-y-2">
                <Label htmlFor="reviewBody">Recensione</Label>
                <Input
                    id="reviewBody"
                    name="reviewBody"
                    required
                />
            </div>
            <div className="grid gap-y-2">
                <Label htmlFor="reviewStars">Valutazione</Label>
                <div className="grid grid-cols-3">
                    <Input
                        className="col-span-2"
                        id="reviewStars"
                        name="reviewStars"
                        required
                        type="range"
                        min={1}
                        max={5}
                        defaultValue={stars}
                        onChange={(e) => setStars(Number(e.target.value))}
                    />
                    <div className="flex justify-center content-center">{stars}</div>
                </div>
            </div>
            <Button onClick={() => onSubmit()}><Send/>Invia</Button>
        </form>
    </Card>
}