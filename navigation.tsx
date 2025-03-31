"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Mic, User, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

export default function Navigation() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Don't show navigation on welcome, login, and signup pages
  const hideNavigation = ["/welcome", "/login", "/signup"].includes(pathname)

  if (hideNavigation) {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Discover",
      href: "/discover",
      icon: Search,
    },
    {
      name: "Record",
      href: "/record",
      icon: Mic,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-muted bg-card shadow-periwinkle-sm">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md transition-colors",
                isActive ? "text-accent" : "text-muted-foreground hover:text-accent",
                isActive && "bg-background/70",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

