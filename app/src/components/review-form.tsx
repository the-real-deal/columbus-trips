import { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import useDbContext from "@/lib/useDbContext";

type ReviewFormProps = {
    className?: string;
    tripId: string;
    userId: string;
    onSuccess: () => void; // callback per aggiornare lista recensioni
};

export default function ReviewForm({ className, tripId, userId, onSuccess }: ReviewFormProps) {
    const [stars, setStars] = useState<number>(1);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const dbInfo = useDbContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(dbInfo.baseAddress().concat("/Review/new-trip-review"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    rating: stars,
                    userId,
                    tripId,
                    pointOfInterestId: null,
                }),
            });

            if (!res.ok) throw new Error("Errore nell'invio della recensione");

            setText("");
            setStars(1);
            onSuccess(); // aggiorna la lista delle recensioni nel parent
        } catch (err) {
            console.error(err);
            alert("Impossibile inviare la recensione.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={cn(className)}>
            <form className="px-8 py-5 grid gap-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-y-2">
                    <Label htmlFor="reviewBody">Recensione</Label>
                    <Input
                        id="reviewBody"
                        name="reviewBody"
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                            value={stars}
                            onChange={(e) => setStars(Number(e.target.value))}
                        />
                        <div className="flex justify-center content-center">{stars}</div>
                    </div>
                </div>
                <Button type="submit" disabled={loading}>
                    <Send className="mr-2" />
                    {loading ? "Invio in corso..." : "Invia"}
                </Button>
            </form>
        </Card>
    );
}
