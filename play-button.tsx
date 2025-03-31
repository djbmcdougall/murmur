"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PlayButtonProps {
  onToggle?: (isPlaying: boolean) => void
  className?: string
  size?: "sm" | "md" | "lg"
  initialState?: boolean
}

export default function PlayButton({ onToggle, className, size = "md", initialState = false }: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(initialState)

  const handleClick = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    onToggle?.(newState)
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <button
      onClick={handleClick}
      className={cn("relative rounded-full border-2 transition-all hover:scale-105", sizeClasses[size], className)}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {isPlaying ? (
          // Pause icon
          <div className="flex gap-[3px]">
            <div className="h-3.5 w-[3px] bg-white" />
            <div className="h-3.5 w-[3px] bg-white" />
          </div>
        ) : (
          // Play icon
          <div className="h-0 w-0 translate-x-[1px] border-y-[6px] border-l-[10px] border-r-0 border-solid border-y-transparent border-l-white" />
        )}
      </div>
    </button>
  )
}

