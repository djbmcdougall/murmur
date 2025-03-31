"use client"

import { useState } from "react"
import { Mic, MicOff, Pause, Play, ImageIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcribedText, setTranscribedText] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      setIsPaused(false)
    } else {
      setIsRecording(false)
      setIsPaused(false)
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="container max-w-2xl px-4 py-8 pb-20">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Record a Murmur</h1>
        <p className="text-muted-foreground">Share your authentic recommendation</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10">
              {isRecording ? (
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20"></div>
                  {isPaused ? (
                    <MicOff className="h-12 w-12 text-secondary" />
                  ) : (
                    <Mic className="h-12 w-12 text-secondary" />
                  )}
                </div>
              ) : (
                <Mic className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <div className="mb-2 text-2xl font-mono">{formatTime(recordingTime)}</div>

            <div className="flex space-x-2">
              <Button variant={isRecording ? "outline" : "secondary"} onClick={toggleRecording}>
                {isRecording ? "Stop" : "Start Recording"}
              </Button>

              {isRecording && (
                <Button variant="outline" onClick={togglePause}>
                  {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="transcription">Your recommendation</Label>
              <Textarea
                id="transcription"
                placeholder="Tap the microphone to start recording your recommendation..."
                value={transcribedText}
                onChange={(e) => setTranscribedText(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="location">Location (optional)</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Add a location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Add photos (optional)</Label>
              <div className="mt-2 flex items-center space-x-2">
                <Button variant="outline" className="h-20 w-20">
                  <ImageIcon className="h-6 w-6" />
                </Button>
                {/* Photo preview would go here */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button disabled={!transcribedText.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Publish
        </Button>
      </div>
    </div>
  )
}

