"use client"

import { useEffect, useState } from "react"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import ActivityCard from "./activity-card"
import { Card, CardContent } from "./ui/card"
import useDbContext from "@/lib/useDbContext"

type InterestingActivitiesProps = {
  className?: string
  username: string
}

type NearbyActivity = {
  activityID: string
  activityName: string
  poiID: string
  poiName: string
  distanceKm: number
  category: string
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
  const [activityDetailsList, setActivityDetailsList] = useState<ActivityDetails[]>([])
  const [bestPOIs, setBestPOIs] = useState<BestPOI[]>([])
  const [loading, setLoading] = useState(true)

  const dbInfo = useDbContext()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${dbInfo.baseAddress()}/Statistics/poi-around-you?username=${username}`)
        const nearbyActivities: NearbyActivity[] = await res.json()

        const detailPromises = nearbyActivities.map((activity) =>
          fetch(`${dbInfo.baseAddress()}/activity-details?activityid=${activity.activityID}`).then(res => res.json())
        )

        const details = await Promise.all(detailPromises)
        setActivityDetailsList(details)
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

    const loadData = async () => {
      await Promise.all([fetchActivities(), fetchBestPOIs()])
      setLoading(false)
    }

    loadData()
  }, [username])

  return (
    <section className={cn(className)}>
      <h2 className="text-5xl">Attività di mio interesse</h2>
      <Separator className="mt-2 mb-5" />

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {activityDetailsList.map((activity, idx) => (
              <ActivityCard key={idx} activity={activity} />
            ))}
          </div>

          <h3 className="text-3xl mb-3">POI Consigliati per Categoria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {bestPOIs.map((poi, idx) => (
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
        </>
      )}
    </section>
  )
}
