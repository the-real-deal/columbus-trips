import { Trash2 } from "lucide-react";
import ReviewCard from "../review-card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

type ReviewListProps = {
    className?: string
}

export default function ReviewList({ className }: ReviewListProps) {
    const handleDelete = useCallback<(refId: string) => void>((refId) => {
        console.log("removed " + refId)
    }, [])
    return <div className={cn(className, "")}>
        <table className="table-auto w-full text-center">
            <thead>
                <tr className="bg-(--primary)/20">
                    <th className="py-2">Riferimento</th>
                    <th className="py-2">Recensione</th>
                    <th className="py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {
                    [...Array(10).keys()].map(n => {
                        const refId = n % 2 === 0 ? "TR193042" : "POI19304"
                        return <tr>
                            <td className="py-1">{refId}</td>
                            <td className="py-1 flex justify-center"><ReviewCard/></td>
                            <td className="py-1">
                                <Button onClick={() => handleDelete(refId)}><Trash2/></Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}