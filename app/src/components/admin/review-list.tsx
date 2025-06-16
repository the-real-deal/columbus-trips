import { Trash2 } from "lucide-react";
import ReviewCard from "../review-card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import useDbContext from "@/lib/useDbContext";

/**
 * Type describing the shape of a review returned by the API
 */
export type Review = {
    id: string;
    text: string;
    rating: number;
    dateWritten: string;
    userId?: string;
    tripId?: string | null;
    pointOfInterestId?: string | null;
};

export type ReviewListProps = {
    className?: string;
};

export default function ReviewList({ className }: ReviewListProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dbInfo = useDbContext()

    /**
     * Fetch all the reviews as soon as the component mounts.
     * The endpoint is hosted locally, so remember to run your ASP.NET backend!
    */
    const abortController = new AbortController();
    const fetchReviews = async function fetchReviews() {
        try {
            const response = await fetch(
                dbInfo.baseAddress().concat("/Review/all-reviews"),
                { signal: abortController.signal }
            );

            if (!response.ok) {
                throw new Error(`Errore ${response.status}: ${response.statusText}`);
            }

            const data: Review[] = await response.json();
            setReviews(data);
        } catch (err) {
            if ((err as Error).name !== "AbortError") {
                console.error(err);
                setError((err as Error).message);
            }
        } finally {
            setLoading(false);
        }
    }

    /**
     * Removes the review from the local state.
     * You can later extend this to call a DELETE endpoint as well.
     */
    const handleDelete = useCallback((reviewId: string) => {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        console.log("removed " + reviewId);
    }, []);

    return (
        <div className={cn(className, "")}>
            <Button onClick={() => fetchReviews()}>Fetch Reviews</Button>
            <table className="table-auto w-full text-center">
                <thead>
                    <tr className="bg-(--primary)/20">
                        <th className="py-2">Riferimento</th>
                        <th className="py-2">Recensione</th>
                        <th className="py-2">Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length === 0 ? <p>No recensioni</p> : reviews.map((review) => {
                        // Use tripId when present, otherwise pointOfInterestId, otherwise the review id
                        const refId = review.tripId ?? review.pointOfInterestId ?? review.id;
                        return (
                            <tr key={review.id} className="odd:bg-muted/50">
                                <td className="py-1 font-mono">{refId}</td>
                                <td className="py-1 flex justify-center">
                                    <ReviewCard review={review} />
                                </td>
                                <td className="py-1">
                                    <Button variant="ghost" onClick={() => handleDelete(review.id)}>
                                        <Trash2 />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
