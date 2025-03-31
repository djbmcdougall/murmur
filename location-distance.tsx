"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface LocationDistanceProps {
  latitude: number
  longitude: number
  showIcon?: boolean
  className?: string
}

export default function LocationDistance({
  latitude,
  longitude,
  showIcon = true,
  className = "",
}: LocationDistanceProps) {
  const { user } = useAuth()
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (user?.location) {
      // Calculate distance between user location and recommendation location
      const userLat = user.location.latitude
      const userLng = user.location.longitude

      // Haversine formula to calculate distance between two points
      const R = 6371 // Radius of the earth in km
      const dLat = deg2rad(latitude - userLat)
      const dLon = deg2rad(longitude - userLng)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c // Distance in km

      setDistance(d)
    }
  }, [user, latitude, longitude])

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`
    }
    return `${distance.toFixed(1)} km`
  }

  if (!distance) return null

  return (
    <div className={`flex items-center text-xs text-muted-foreground ${className}`}>
      {showIcon && <MapPin className="mr-1 h-3 w-3" />}
      <span>{formatDistance(distance)} away</span>
    </div>
  )
}

