"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MapViewProps {
  latitude: number
  longitude: number
  name: string
  zoom?: number
  interactive?: boolean
  className?: string
}

export default function MapView({
  latitude,
  longitude,
  name,
  zoom = 15,
  interactive = true,
  className = "h-64 w-full",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // In a real implementation, this would initialize a map library like Google Maps or Mapbox
    // For this demo, we'll create a simple placeholder
    if (mapRef.current) {
      setMapLoaded(true)
    }
  }, [latitude, longitude, zoom])

  const getDirections = () => {
    // Open native maps app or Google Maps with directions
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, "_blank")
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div
        ref={mapRef}
        className="absolute inset-0 bg-muted flex items-center justify-center"
        style={{
          backgroundImage: `url(/placeholder.svg?height=400&width=600&text=Map+View)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!mapLoaded && <div className="flex items-center justify-center h-full w-full">Loading map...</div>}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-destructive" />
            <div className="mt-1 bg-background/90 px-2 py-1 rounded-md text-xs font-medium">{name}</div>
          </div>
        </div>
      </div>

      {interactive && (
        <div className="absolute bottom-2 right-2">
          <Button
            onClick={getDirections}
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90"
          >
            Get Directions
          </Button>
        </div>
      )}
    </Card>
  )
}

