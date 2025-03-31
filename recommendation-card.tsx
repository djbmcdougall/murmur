"use client"

import Image from "next/image"
import { useState } from "react"
import { ThumbsUp, Heart, Share2, MessageCircle, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AudioPlayer from "./audio-player"
import { FlagContentDialog } from "./flag-content-dialog"
import { Toaster } from "./ui/toaster"

interface RecommendationCardProps {
  recommendation: {
    id: string
    user: {
      name: string
      avatar: string
    }
    text: string
    location: string | null
    coordinates?: {
      latitude: number
      longitude: number
    }
    category: string
    sentiment: string
    image: string | null
    audio?: string
    reactions: {
      thumbsUp?: number
      thumbsDown?: number
      heart?: number
    }
    verified: boolean
  }
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)
  const [flagDialogOpen, setFlagDialogOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHearted, setIsHearted] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Mock audio URL if not provided
  const audioUrl = recommendation.audio || "/placeholder.mp3"

  // Determine if text should be truncated
  const shouldTruncate = recommendation.text.length > 150
  const truncatedText =
    shouldTruncate && !isExpanded ? `${recommendation.text.substring(0, 150)}...` : recommendation.text

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      <Card className="overflow-hidden bg-card shadow-blue-sm border-muted">
        {recommendation.image && !imageError ? (
          <div className="relative h-48 w-full bg-muted">
            <Image
              src={recommendation.image || "/placeholder.svg"}
              alt={`Image for ${recommendation.text.substring(0, 20)}...`}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>
        ) : recommendation.image ? (
          <div className="h-48 w-full bg-muted flex items-center justify-center text-muted-foreground">
            Image not available
          </div>
        ) : null}

        <CardContent className="p-4">
          {/* User info and category */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-muted overflow-hidden relative">
                <Image
                  src={recommendation.user.avatar || "/placeholder.svg?height=48&width=48&text=User"}
                  alt={recommendation.user.name}
                  width={48}
                  height={48}
                  className="object-cover"
                  onError={(e) => {
                    // Fallback for avatar errors
                    e.currentTarget.src = `/placeholder.svg?height=48&width=48&text=${recommendation.user.name.charAt(0)}`
                  }}
                />
              </div>
              <span className="font-medium text-lg">{recommendation.user.name}</span>
            </div>
            <div
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                recommendation.sentiment === "Positive"
                  ? "bg-success text-success-foreground"
                  : recommendation.sentiment === "Negative"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-secondary text-secondary-foreground",
              )}
            >
              {recommendation.category}
            </div>
          </div>

          {/* Audio player */}
          <div className="mb-4 p-3 rounded-md bg-muted/50">
            <AudioPlayer audioUrl={audioUrl} />
          </div>

          {/* Content text */}
          <div className="mb-2">
            <p className="text-foreground">{truncatedText}</p>

            {shouldTruncate && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full hover:bg-muted/50"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 stroke-[2.5px] text-accent" />
                  ) : (
                    <ChevronDown className="h-5 w-5 stroke-[2.5px] text-accent" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-muted p-4">
          <div className="flex space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 space-x-2 px-0 hover:bg-transparent"
              onClick={() => setIsLiked(!isLiked)}
            >
              <ThumbsUp className={cn("h-5 w-5", isLiked ? "text-primary" : "text-muted-foreground")} />
              <span className={isLiked ? "text-primary" : "text-muted-foreground"}>
                {isLiked && recommendation.reactions.thumbsUp
                  ? recommendation.reactions.thumbsUp + 1
                  : recommendation.reactions.thumbsUp}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 space-x-2 px-0 hover:bg-transparent"
              onClick={() => setIsHearted(!isHearted)}
            >
              <Heart className={cn("h-5 w-5", isHearted ? "text-destructive" : "text-muted-foreground")} />
              <span className={isHearted ? "text-destructive" : "text-muted-foreground"}>
                {isHearted && recommendation.reactions.heart
                  ? recommendation.reactions.heart + 1
                  : recommendation.reactions.heart}
              </span>
            </Button>
          </div>

          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50">
              <Share2 className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 hover:bg-muted/50", isFlagged && "text-warning")}
              onClick={() => setFlagDialogOpen(true)}
            >
              <Flag className={cn("h-5 w-5", isFlagged ? "text-warning" : "text-muted-foreground")} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <FlagContentDialog
        open={flagDialogOpen}
        onOpenChange={(open) => {
          setFlagDialogOpen(open)
          if (!open && !isFlagged) {
            setIsFlagged(true)
          }
        }}
        contentId={recommendation.id}
      />

      <Toaster />
    </>
  )
}

