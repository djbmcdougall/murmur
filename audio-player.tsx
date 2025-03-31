"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  audioUrl: string
  className?: string
}

export default function AudioPlayer({ audioUrl, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)

  // Load audio duration
  useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
    })

    return () => {
      audio.removeEventListener("loadedmetadata", () => {})
    }
  }, [audioUrl])

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying)
  }

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={handlePlayToggle}
        className="relative rounded-full bg-primary h-12 w-12 flex items-center justify-center text-primary-foreground"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <div className="flex gap-[3px]">
            <div className="h-3.5 w-[3px] bg-white" />
            <div className="h-3.5 w-[3px] bg-white" />
          </div>
        ) : (
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-white ml-1"></div>
        )}
      </button>

      <div className="flex-1">
        <div className="h-8 w-full relative">
          <svg width="100%" height="32" viewBox="0 0 800 32" preserveAspectRatio="none" className="text-primary/40">
            {Array.from({ length: 100 }).map((_, i) => {
              const height = Math.sin(i / 10) * 10 + Math.random() * 8 + 8
              return (
                <rect key={i} x={i * 8} y={(32 - height) / 2} width={4} height={height} rx={2} fill="currentColor" />
              )
            })}
          </svg>
        </div>
        <div className="text-right text-xs text-muted-foreground mt-1">{formatTime(duration)}</div>
      </div>
    </div>
  )
}

