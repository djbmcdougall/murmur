"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"
import Link from "next/link"

type Notification = {
  id: string
  type: "follow" | "like" | "comment" | "mention" | "recommendation"
  userId: string
  userName: string
  userAvatar: string
  content: string
  read: boolean
  timestamp: string
  link: string
}

export default function NotificationDropdown() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch notifications from an API
    // For demo purposes, we'll use mock data
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "follow",
        userId: "2",
        userName: "Sarah Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
        content: "started following you",
        read: false,
        timestamp: "2 hours ago",
        link: "/profile/2",
      },
      {
        id: "2",
        type: "like",
        userId: "3",
        userName: "Mike Chen",
        userAvatar: "/placeholder.svg?height=40&width=40&text=MC",
        content: "liked your recommendation about Brew & Bean",
        read: false,
        timestamp: "5 hours ago",
        link: "/recommendations/1",
      },
      {
        id: "3",
        type: "comment",
        userId: "4",
        userName: "Emily Rodriguez",
        userAvatar: "/placeholder.svg?height=40&width=40&text=ER",
        content: "commented on your recommendation",
        read: false,
        timestamp: "1 day ago",
        link: "/recommendations/2",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto text-xs font-normal" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">No notifications yet</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex items-start p-3 ${notification.read ? "" : "bg-muted/50"}`}
              onClick={() => markAsRead(notification.id)}
              asChild
            >
              <Link href={notification.link}>
                <div className="flex w-full items-start">
                  <Image
                    src={notification.userAvatar || "/placeholder.svg"}
                    alt={notification.userName}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{notification.userName}</span> {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

