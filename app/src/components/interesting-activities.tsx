"use client"

import { useEffect, useState } from "react"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import ActivityCard from "./activity-card"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import useDbContext from "@/lib/useDbContext"

type InterestingActivitiesProps = {
    className?: string
    username: string
}

type ActivityDetails = {
    name: string
    description: string
    categories: { value: string }[]
    duration: string
    minPrice: number
    maxPrice: number
}

type BestPOI = {
    name: string
    poI_ID: string
    category: string
    weight: number
    maxAvgRate: number
}

export default function InterestingActivities({ className, username }: InterestingActivitiesProps) {
    const [activityDetailsList, setActivityDetailsList] = useState(
        [
            {
                activityID: "0",
                activityName: "Test Gastronomy",
                activityDescription: "Test Activity",
                activityDuration: 45,
                activityMaxPrice: 10,
                activityMinPrice: 5,
                poiID: "4a545017-67a2-47e4-b9b7-c55441c75ed7",
                poiName: "Colosseum",
                distanceKm: 1.5939283988466189,
                category: "string"
            }
        ]

    )
    const [bestPOIs, setBestPOIs] = useState<BestPOI[]>([])

    const dbInfo = useDbContext()

    const fetchActivities = async () => {
        try {
            const res = await fetch(`${dbInfo.baseAddress()}/Statistics/poi-around-you?username=${username}`)
            const nearbyActivities = await res.json()
            setActivityDetailsList(nearbyActivities)
        } catch (error) {
            console.error("Errore nel recupero attività:", error)
        }
    }

    const fetchBestPOIs = async () => {
        try {
            const res = await fetch(`${dbInfo.baseAddress()}/Statistics/best-poi-by-category?username=${username}`)
            const pois: BestPOI[] = await res.json()
            setBestPOIs(pois)
        } catch (error) {
            console.error("Errore nel recupero POI:", error)
        }
    }

    return (
        <section className={cn(className)}>
            <h2 className="text-5xl">Attività di mio interesse</h2>
            <Separator className="mt-2 mb-5" />

            <div className="grid grid-cols-1 gap-5 mb-10">
                <Button onClick={() => fetchActivities()}>fetchActivities</Button>
                {activityDetailsList[0].activityID === "0" ? <p>Nessuna attività da mostrare</p> : activityDetailsList.map((activity, idx) => (
                    <>
                        <p>Punto di interesse: {activity.poiName} - {activity.poiID}</p>
                        <ActivityCard key={idx} activity={{
                            name: activity.activityName,
                            description: activity.activityDescription,
                            duration: activity.activityDuration,
                            minPrice: activity.activityMinPrice,
                            maxPrice: activity.activityMaxPrice,
                            categories: [ activity.category ]
                        }} />
                    </>
                ))}
            </div>

            <h3 className="text-3xl mb-3">POI Consigliati per Categoria</h3>
            <div className="grid grid-cols-1 gap-3">
                <Button onClick={() => fetchBestPOIs()}>fetchBestPOIs</Button>
                { bestPOIs.length === 0 ? <p>Nessun POI da mostrare</p> : bestPOIs.map((poi, idx) => (
                    <Card key={idx}>
                        <CardContent className="p-4">
                            <p><strong>ID:</strong> {poi.poI_ID}</p>
                            <p><strong>Nome:</strong> {poi.name}</p>
                            <p><strong>Categoria:</strong> {poi.category}</p>
                            <p><strong>Peso:</strong> {poi.weight}</p>
                            <p><strong>Rating medio max:</strong> {poi.maxAvgRate}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </section>
    )
}
