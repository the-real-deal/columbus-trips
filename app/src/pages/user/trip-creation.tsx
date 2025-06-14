import DefaultLayout from "@/components/layout/default-layout";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PointOfInterest {
    id: string;
    name: string;
}

const mockPOIs: PointOfInterest[] = [
    { id: "1", name: "Eiffel Tower" },
    { id: "2", name: "Colosseum" },
    { id: "3", name: "Statue of Liberty" },
];

export default function TripCreation() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [poiQuery, setPoiQuery] = useState("");
    const [selectedPOIs, setSelectedPOIs] = useState<PointOfInterest[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const filteredPOIs = mockPOIs.filter(poi =>
        poi.name.toLowerCase().includes(poiQuery.toLowerCase())
    );

    const addPOI = (poi: PointOfInterest) => {
        if (!selectedPOIs.find(p => p.id === poi.id)) {
            setSelectedPOIs([...selectedPOIs, poi]);
        }
    };

    const removePOI = (id: string) => {
        setSelectedPOIs(selectedPOIs.filter(p => p.id !== id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const trip = {
            name,
            description,
            isPublic,
            createdAt: new Date().toISOString(),
            poiIds: selectedPOIs.map(p => p.id),
            image: imageFile ? imageFile.name : null, // Simulating upload name for now
        };
        console.log("Trip to submit:", trip);
        // Submit to API here
    };

    return <DefaultLayout>
        <h1 className="text-5xl text-center pb-5">Crea un nuovo <span className="font-bold">itinerario</span></h1>
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <Card>
                <CardContent className="space-y-4 p-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Trip Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Trip Picture (optional)</Label>
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="public" checked={isPublic} onCheckedChange={value => setIsPublic(!!value)} />
                        <Label htmlFor="public">Public Trip</Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="poi">Add Points of Interest (order matters)</Label>
                        <Input
                            id="poi"
                            placeholder="Search POIs..."
                            value={poiQuery}
                            onChange={(e) => setPoiQuery(e.target.value)}
                        />
                        {poiQuery && (
                            <div className="bg-muted p-2 rounded space-y-1">
                                {filteredPOIs.map(poi => (
                                    <div
                                        key={poi.id}
                                        className="cursor-pointer hover:bg-accent p-1 rounded"
                                        onClick={() => addPOI(poi)}
                                    >
                                        {poi.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {selectedPOIs.map((poi, index) => (
                            <Badge
                                key={poi.id}
                                className="cursor-pointer"
                                onClick={() => removePOI(poi.id)}
                            >
                                {index + 1}. {poi.name} ✕
                            </Badge>
                        ))}
                    </div>

                    <Button onClick={handleSubmit}>Create Trip</Button>
                </CardContent>
            </Card>
        </div>
    </DefaultLayout>
}