"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PlayButton from "./play-button"
import AudioPlayer from "./audio-player"

type MediaItem = {
  type: "image" | "video" | "audio"
  url: string
  thumbnail?: string
  duration?: number
}

interface MediaGalleryProps {
  media: MediaItem[]
  className?: string
}

export default function MediaGallery({ media, className }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const currentMedia = media[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "h-64",
        className,
      )}
    >
      {/* Main media display */}
      <div className="relative h-full w-full">
        {currentMedia.type === "image" && (
          <Image src={currentMedia.url || "/placeholder.svg"} alt="Media content" fill className="object-cover" />
        )}

        {currentMedia.type === "video" && (
          <div className="h-full w-full bg-black">
            <video
              src={currentMedia.url}
              poster={currentMedia.thumbnail}
              className="h-full w-full object-contain"
              controls={false}
              autoPlay={isPlaying}
              muted={isMuted}
              loop
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <PlayButton
                size="md"
                onToggle={(playing) => {
                  setIsPlaying(playing)
                  // If starting to play, unmute by default
                  if (playing && isMuted) setIsMuted(false)
                }}
              />
              {isPlaying && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                </Button>
              )}
            </div>
          </div>
        )}

        {currentMedia.type === "audio" && (
          <div className="flex h-full w-full items-center justify-center bg-muted p-6">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <Image
                  src={currentMedia.thumbnail || "/placeholder.svg?height=100&width=100&text=Audio"}
                  alt="Audio thumbnail"
                  width={100}
                  height={100}
                  className="mx-auto rounded-full"
                />
              </div>
              <AudioPlayer audioUrl={currentMedia.url} waveformHeight={50} showVolumeControl={true} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation controls */}
      {media.length > 1 && (
        <>
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Thumbnails/indicators */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
            {media.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-all",
                  index === currentIndex ? "bg-white" : "bg-white/50",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}

      {/* Fullscreen toggle */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
        onClick={toggleFullscreen}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

