"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface FollowButtonProps {
  userId: string
  initialFollowing?: boolean
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
  className?: string
}

export default function FollowButton({
  userId,
  initialFollowing = false,
  variant = "default",
  size = "default",
  showIcon = true,
  className = "",
}: FollowButtonProps) {
  const { user, updateUser } = useAuth()
  const [isFollowing, setIsFollowing] = useState(initialFollowing || (user?.following || []).includes(userId))
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const newFollowing = isFollowing ? user.following.filter((id) => id !== userId) : [...user.following, userId]

      await updateUser({ following: newFollowing })
      setIsFollowing(!isFollowing)

      // In a real app, you would also send a notification to the user being followed
    } catch (error) {
      console.error("Error updating follow status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleFollow} disabled={isLoading} className={className}>
      {showIcon && <Users className="mr-2 h-4 w-4" />}
      {isFollowing ? "Following" : "Follow"}
    </Button>
  )
}

