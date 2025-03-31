"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AudioWaveformProps {
  audioUrl: string
  isPlaying: boolean
  className?: string
  barWidth?: number
  barGap?: number
  barColor?: string
  progressColor?: string
  height?: number
  useGradient?: boolean
  gradientColors?: [string, string]
  onPlaybackComplete?: () => void
  onTimeUpdate?: (currentTime: number) => void
}

export default function AudioWaveform({
  audioUrl,
  isPlaying,
  className,
  barWidth = 3,
  barGap = 2,
  barColor = "#DADBE9", // Mist
  progressColor = "#7B91C9", // Accent Blue
  height = 40,
  useGradient = false,
  gradientColors = ["#7B91C9", "#9F9BC8"], // Accent Blue to Accent Lavender
  onPlaybackComplete,
  onTimeUpdate,
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number>(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioData, setAudioData] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize audio element and load audio data
  useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    })

    audio.addEventListener("ended", () => {
      if (onPlaybackComplete) {
        onPlaybackComplete()
      }
    })

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime)
      }
    })

    // Generate placeholder waveform data until real data is available
    const placeholderData = Array(50)
      .fill(0)
      .map(() => Math.random() * 0.5 + 0.2)
    setAudioData(placeholderData)

    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("ended", () => {})
      audio.removeEventListener("timeupdate", () => {})
    }
  }, [audioUrl, onPlaybackComplete, onTimeUpdate])

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    const initializeAudio = () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      dataArrayRef.current = dataArray

      const source = audioContext.createMediaElementSource(audioRef.current!)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      sourceRef.current = source

      // Generate more realistic waveform data based on audio characteristics
      // This is a simplified approach - real implementation would analyze the actual audio
      const enhancedData = Array(50)
        .fill(0)
        .map((_, i) => {
          // Create a more natural looking waveform with higher values in the middle
          const position = i / 50
          const centerDistance = Math.abs(position - 0.5)
          const amplitude = Math.random() * 0.3 + 0.3 - centerDistance * 0.5
          return amplitude
        })

      setAudioData(enhancedData)
    }

    // Only initialize if not already done
    if (!audioContextRef.current) {
      try {
        initializeAudio()
      } catch (error) {
        console.error("Error initializing audio context:", error)
      }
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        // Clean up audio context when component unmounts
        if (sourceRef.current) {
          sourceRef.current.disconnect()
        }
        if (analyserRef.current) {
          analyserRef.current.disconnect()
        }
      }
    }
  }, [isLoaded])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error)
        })
      }

      // Resume audio context if it was suspended
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume()
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isLoaded])

  // Draw waveform
  useEffect(() => {
    if (!canvasRef.current || !audioData.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    // Set canvas dimensions accounting for device pixel ratio
    canvas.width = rect.width * dpr
    canvas.height = height * dpr

    // Scale context for high DPI displays
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, height)

    const totalBars = Math.floor(rect.width / (barWidth + barGap))
    const barHeightMultiplier = height * 0.8 // Max height is 80% of canvas height

    // Create gradient if enabled
    let gradient = null
    let progressGradient = null

    if (useGradient) {
      gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
      gradient.addColorStop(0, gradientColors[0])
      gradient.addColorStop(1, gradientColors[1])

      progressGradient = ctx.createLinearGradient(0, 0, rect.width, 0)
      progressGradient.addColorStop(0, progressColor)
      progressGradient.addColorStop(1, "#6665A2") // Signal Purple
    }

    // Draw each bar
    for (let i = 0; i < totalBars; i++) {
      // Use available data or generate random for missing values
      const dataIndex = Math.floor((i * audioData.length) / totalBars)
      const amplitude = audioData[dataIndex] || Math.random() * 0.5 + 0.2

      const barHeight = amplitude * barHeightMultiplier
      const x = i * (barWidth + barGap)
      const y = (height - barHeight) / 2

      // Calculate progress position
      const progress = currentTime / duration
      const isActive = i / totalBars < progress

      // Set color based on playback progress and gradient option
      if (useGradient) {
        ctx.fillStyle = isActive ? progressGradient || progressColor : gradient || barColor
      } else {
        ctx.fillStyle = isActive ? progressColor : barColor
      }

      // Draw rounded bar
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [barWidth / 2])
      ctx.fill()
    }
  }, [audioData, barWidth, barGap, barColor, progressColor, height, currentTime, duration, useGradient, gradientColors])

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="w-full cursor-pointer"
        style={{ height: `${height}px` }}
        onClick={(e) => {
          if (!audioRef.current || !isLoaded) return

          // Calculate position click
          const rect = e.currentTarget.getBoundingClientRect()
          const clickPosition = (e.clientX - rect.left) / rect.width

          // Set audio position
          audioRef.current.currentTime = clickPosition * duration
        }}
      />
    </div>
  )
}

