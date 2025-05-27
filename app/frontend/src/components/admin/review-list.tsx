import { Trash2 } from "lucide-react";
import ReviewCard from "../review-card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ReviewListProps = {
    className?: string
}

export default function ReviewList({ className }: ReviewListProps) {
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
                    [...Array(10).keys()].map(_ => <tr>
                        <td className="py-1">TR193042</td>
                        <td className="py-1 flex justify-center"><ReviewCard/></td>
                        <td className="py-1">
                            <Button><Trash2/></Button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
}