'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useDbContext from '@/lib/useDbContext';
import { v4 as uuidv4 } from 'uuid';

type POI = {
    name: string;
    description: string;
    website?: string;
    longitude: string;
    latitude: string;
    poiId: string;
    cityId: string;
    userId: string;
};

export default function POIForm() {
    const dbInfo = useDbContext();
    const [formData, setFormData] = useState<POI>({
        name: '',
        description: '',
        website: '',
        longitude: '',
        latitude: '',
        poiId: uuidv4(),
        cityId: '',
        userId: 'PaoloBitta77' // Puoi anche renderlo dinamico in futuro
    });

    const [errors, setErrors] = useState<{ description?: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'description' && value.length > 300) {
            setErrors({ description: 'Description cannot exceed 300 characters.' });
        } else {
            setErrors({});
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.description.length > 300) {
            setErrors({ description: 'Description cannot exceed 300 characters.' });
            return;
        }

        if (!formData.cityId.trim()) {
            alert("Inserisci un ID città valido.");
            return;
        }

        const payload = {
            cityId: formData.cityId,
            name: formData.name,
            description: formData.description,
            website: formData.website || '',
            longitude: parseFloat(formData.longitude),
            latitude: parseFloat(formData.latitude),
            poiId: formData.poiId,
            userId: formData.userId
        };

        try {
            const response = await fetch(dbInfo.baseAddress().concat('/Ticket/poi-insertion-attempt'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API error: ${response.status} - ${text}`);
            }

            const result = await response.json();
            console.log('POI sent successfully:', result);

            alert("POI inviato con successo!");
            setFormData({
                name: '',
                description: '',
                website: '',
                longitude: '',
                latitude: '',
                poiId: uuidv4(),
                cityId: '',
                userId: 'PaoloBitta77'
            });
        } catch (err) {
            console.error('Errore durante l\'invio:', err);
            alert("Errore durante l'invio del POI.");
        }
    };

    return (
        <Card className="max-w-xl mx-auto mt-10 p-6">
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-y-2">
                        <Label htmlFor="cityId">ID Città</Label>
                        <Input
                            id="cityId"
                            name="cityId"
                            value={formData.cityId}
                            onChange={handleChange}
                            required
                            placeholder="Es. 140037"
                        />
                    </div>

                    <div className="grid gap-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Eiffel Tower"
                        />
                    </div>

                    <div className="grid gap-y-2">
                        <Label htmlFor="description">Descrizione (max 300 caratteri)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={300}
                            required
                            placeholder="Descrizione del POI"
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="grid gap-y-2">
                        <Label htmlFor="website">Sito web (opzionale)</Label>
                        <Input
                            id="website"
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="grid gap-x-5 grid-cols-2">
                        <div className="grid gap-y-2">
                            <Label htmlFor="longitude">Longitudine</Label>
                            <Input
                                id="longitude"
                                name="longitude"
                                type="number"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                placeholder="E.g. 2.2945"
                            />
                        </div>
                        <div className="grid gap-y-2">
                            <Label htmlFor="latitude">Latitudine</Label>
                            <Input
                                id="latitude"
                                name="latitude"
                                type="number"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                placeholder="E.g. 48.8584"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Invia
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
