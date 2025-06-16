import { Star } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { useState } from "react"

type ReviewCardProps = {
  review: {
    text: string;
    rating: number;
    dateWritten: string;
    userId?: string;
  };
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const [showMore, setShowMore] = useState(false);
  return (
    <Card className="max-w-128">
      <CardHeader>
        <div className="flex justify-between">
          <p>{review.userId ?? "Anonimo"}</p>
          <div className="flex gap-1">
            {[...Array(review.rating).keys()].map(i => <Star key={i} />)}
          </div>
        </div>
        <small className="text-gray-500 text-start">
          {new Date(review.dateWritten).toLocaleDateString()}
        </small>
      </CardHeader>
      <CardContent className={`text-start ${!showMore && "truncate"}`}>
        {review.text}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"link"} onClick={() => setShowMore(!showMore)}>
          Show {showMore ? "less" : "more"}
        </Button>
      </CardFooter>
    </Card>
  );
}
