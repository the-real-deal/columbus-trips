'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from './ui/separator';
import { Hash, Trash } from 'lucide-react';

type POI = {
    name: string,
    description: string,
    website?: string,
    longitude: string,
    altitude: string,
    activities: Array<{ 
        title: string, 
        description: string, 
        themes: Array<String>
    }>,
    pictures: Array<File>
}

export default function POIForm() {
    const [formData, setFormData] = useState<POI>({
        name: '',
        description: '',
        website: '',
        longitude: '',
        altitude: '',
        activities: [
            {
                title: '',
                description: '',
                themes: []
            }
        ],
        pictures: [] as File[]
    });

    const [errors, setErrors] = useState<{ description?: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        activityIndex?: number
    ) => {
        const { name, value } = e.target;

        if (activityIndex !== undefined) {
            const updatedActivities = [...formData.activities];
            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                [name]: value,
            };
            setFormData(prev => ({ ...prev, activities: updatedActivities }));
        } else {
            if (name === 'description' && value.length > 300) {
                setErrors({ description: 'Description cannot exceed 300 characters.' });
            } else {
                setErrors({});
            }
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addActivity = () => {
        setFormData(prev => ({
            ...prev,
            activities: [...prev.activities, { title: '', description: '', themes: [] }]
        }));
    };

    const removeActivity = (index: number) => {
        const updatedActivities = formData.activities.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, activities: updatedActivities }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData(prev => ({
                ...prev,
                pictures: Array.from(files),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.description.length > 300) {
            setErrors({ description: 'Description cannot exceed 300 characters.' });
            return;
        }
        console.log('Submitted POI with activities:', formData);
        // Handle form submission logic here
    };

    return (
        <Card className="max-w-xl mx-auto mt-10 p-6">
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='grid gap-y-2'>
                        <Label htmlFor="pictures">Immagini (opzionale)</Label>
                        <Input
                            id="pictures"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {formData.pictures.length > 0 && (
                            <ul className="mt-2 text-sm text-muted-foreground list-none flex flex-wrap gap-x-3 gap-y-1">
                                {formData.pictures.map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                        )}
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
                            placeholder="Le jeux sont fait"
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
                        <div className='grid gap-y-2'>
                            <Label htmlFor="longitude">Longitudine</Label>
                            <Input
                                id="longitude"
                                type="number"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                placeholder="E.g. 2.2945"
                            />
                        </div>
                        <div className='grid gap-y-2'>
                            <Label htmlFor="altitude">Altitudine</Label>
                            <Input
                                id="altitude"
                                type="number"
                                name="altitude"
                                value={formData.altitude}
                                onChange={handleChange}
                                required
                                placeholder="E.g. 300"
                            />
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="text-lg font-medium">Attività previste</h3>

                    {formData.activities.map((activity, index) => (
                        <div key={index} className="space-y-5 border rounded p-4 relative bg-muted">
                            <div className="flex justify-between items-center">
                                <Label><Hash className='inline' /> Attività {index + 1}</Label>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeActivity(index)}
                                    className="text-sm"
                                >
                                    <Trash />
                                </Button>
                            </div>
                            <div className='grid gap-y-2'>
                                <Label htmlFor={`title-${index}`}>Titolo</Label>
                                <Input
                                    id={`title-${index}`}
                                    name="title"
                                    placeholder='Visita guidata'
                                    value={activity.title}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                            </div>

                            <div className='grid gap-y-2'>
                                <Label htmlFor={`desc-${index}`}>Descrizione</Label>
                                <Textarea
                                    id={`desc-${index}`}
                                    name="description"
                                    value={activity.description}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Breve descrizione dell'attività"
                                />
                            </div>

                            <div className='grid gap-y-2'>
                                <Label>Tematiche</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['storia', 'arte', 'letteratura', 'sport'].map((theme) => {
                                        const selected = activity.themes.includes(theme);
                                        return (
                                            <Button
                                                key={theme}
                                                type="button"
                                                variant={selected ? "default" : "outline"}
                                                className="text-sm"
                                                onClick={() => {
                                                    const updatedActivities = [...formData.activities];
                                                    const themes = new Set(updatedActivities[index].themes);
                                                    selected ? themes.delete(theme) : themes.add(theme);
                                                    updatedActivities[index].themes = Array.from(themes);
                                                    setFormData(prev => ({ ...prev, activities: updatedActivities }));
                                                }}
                                            >
                                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={addActivity}
                        variant="outline"
                        className="w-full"
                    >
                        + Add Activity
                    </Button>

                    <Button type="submit" className="w-full">
                        Invia
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
