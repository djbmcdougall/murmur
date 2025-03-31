"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function WarmPaletteDemo() {
  const [activeTab, setActiveTab] = useState("home")
  const [isExpanded, setIsExpanded] = useState(false)

  // Sample recommendation data
  const recommendation = {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    text: "I absolutely loved the coffee at Brew & Bean! The atmosphere was cozy and the staff was super friendly. Definitely recommend their caramel latte! The pastries were also fresh and delicious. I spent a few hours working there and the WiFi was fast and reliable.",
    location: "Brew & Bean Coffee Shop",
    category: "Food & Drink",
    sentiment: "Positive",
    image: "/placeholder.svg?height=300&width=400&text=Coffee+Shop",
    audio: "/placeholder.mp3",
    reactions: {
      thumbsUp: 24,
      heart: 12,
    },
    verified: true,
  }

  // Determine if text should be truncated
  const shouldTruncate = recommendation.text.length > 150
  const truncatedText =
    shouldTruncate && !isExpanded ? `${recommendation.text.substring(0, 150)}...` : recommendation.text

  return (
    <div className="flex flex-col min-h-screen">
      {/* Palette Showcase */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-4">Warm Background Palette Demo</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-20 rounded-md bg-[#F5F0E6] flex items-center justify-center border">
              <span className="text-sm font-medium">Warm Sand</span>
            </div>
            <span className="text-xs mt-1 text-center">#F5F0E6</span>
            <span className="text-xs text-center text-muted-foreground">Primary Background</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 rounded-md bg-[#F0E2D8] flex items-center justify-center border">
              <span className="text-sm font-medium">Terracotta Light</span>
            </div>
            <span className="text-xs mt-1 text-center">#F0E2D8</span>
            <span className="text-xs text-center text-muted-foreground">Secondary Background</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 rounded-md bg-[#E6EDE8] flex items-center justify-center border">
              <span className="text-sm font-medium">Sage Mist</span>
            </div>
            <span className="text-xs mt-1 text-center">#E6EDE8</span>
            <span className="text-xs text-center text-muted-foreground">Tertiary Background</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 rounded-md bg-[#2A2520] flex items-center justify-center border text-white">
              <span className="text-sm font-medium">Warm Charcoal</span>
            </div>
            <span className="text-xs mt-1 text-center">#2A2520</span>
            <span className="text-xs text-center text-muted-foreground">Dark Mode Background</span>
          </div>
        </div>
      </div>

      {/* App Demo with New Palette */}
      <div className="flex-1 bg-[#F5F0E6]">
        {" "}
        {/* Warm Sand as main background */}
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-[#F5F0E6] shadow-sm">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emoticon-lzH7iAcdCUbnTF94t2ErOuKWmJJ19s.png"
                alt="Murmur Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold tracking-tight ml-1">murmur</span>
            </div>

            <div className="flex-1 mx-4">
              <div className="relative w-full max-w-md mx-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search recommendations..."
                  className="w-full rounded-full bg-white pl-8 h-9 text-sm border"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=AM"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
              </Button>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="container px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">For You</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-white">
                All
              </Button>
              <Button variant="outline" size="sm" className="bg-white">
                Food
              </Button>
              <Button variant="outline" size="sm" className="bg-white">
                Travel
              </Button>
            </div>
          </div>

          <Tabs defaultValue="feed" className="mb-6">
            <TabsList className="bg-[#E6EDE8]">
              {" "}
              {/* Sage Mist for tabs */}
              <TabsTrigger value="feed" className="data-[state=active]:bg-white">
                Feed
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-white">
                Trending
              </TabsTrigger>
              <TabsTrigger value="nearby" className="data-[state=active]:bg-white">
                Nearby
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Card with Terracotta Light background */}
                <Card className="overflow-hidden bg-[#F0E2D8] border-0 shadow-sm">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=300&width=400&text=Coffee+Shop"
                      alt="Coffee Shop"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=SJ"
                            alt="Sarah Johnson"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">Sarah Johnson</p>
                              <CheckCircle className="ml-1 h-4 w-4 text-secondary" />
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>Brew & Bean Coffee Shop</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          Food & Drink
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="bg-[#E6EDE8] p-2 rounded-md">
                          {" "}
                          {/* Sage Mist for audio player */}
                          <div className="flex items-center gap-3">
                            <button className="relative rounded-full border-2 border-black h-8 w-8">
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="h-0 w-0 translate-x-[1px] border-y-[6px] border-l-[10px] border-r-0 border-solid border-y-transparent border-l-black" />
                              </div>
                            </button>
                            <div className="flex-1">
                              <div className="relative h-7 bg-[#E6EDE8] rounded-md overflow-hidden">
                                {/* Simulated waveform */}
                                <div className="absolute inset-0 flex items-center justify-around">
                                  {Array.from({ length: 30 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-[3px] bg-muted-foreground rounded-full"
                                      style={{
                                        height: `${Math.sin(i / 3) * 10 + 15}px`,
                                        opacity: i < 10 ? 1 : 0.5,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-right text-xs text-muted-foreground mt-1">01:24</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm">{truncatedText}</p>

                      <div className="flex justify-center mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full"
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 stroke-[2.5px]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 stroke-[2.5px]" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>24</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2">
                        <Heart className="h-4 w-4 text-accent" />
                        <span>12</span>
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Card with Sage Mist background */}
                <Card className="overflow-hidden bg-[#E6EDE8] border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=MC"
                            alt="Mike Chen"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">Mike Chen</p>
                              <CheckCircle className="ml-1 h-4 w-4 text-secondary" />
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>Evergreen Park</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          Outdoors
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="bg-[#F0E2D8] p-2 rounded-md">
                          {" "}
                          {/* Terracotta Light for audio player */}
                          <div className="flex items-center gap-3">
                            <button className="relative rounded-full border-2 border-black h-8 w-8">
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="h-0 w-0 translate-x-[1px] border-y-[6px] border-l-[10px] border-r-0 border-solid border-y-transparent border-l-black" />
                              </div>
                            </button>
                            <div className="flex-1">
                              <div className="relative h-7 bg-[#F0E2D8] rounded-md overflow-hidden">
                                {/* Simulated waveform */}
                                <div className="absolute inset-0 flex items-center justify-around">
                                  {Array.from({ length: 30 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-[3px] bg-muted-foreground rounded-full"
                                      style={{
                                        height: `${Math.cos(i / 2) * 10 + 15}px`,
                                        opacity: 0.5,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-right text-xs text-muted-foreground mt-1">02:15</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm">
                        The new hiking trail at Evergreen Park is absolutely stunning! Great views and well-maintained
                        paths. Perfect for a weekend adventure.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>18</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2">
                        <Heart className="h-4 w-4 text-accent" />
                        <span>9</span>
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-4">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                Trending content would appear here
              </div>
            </TabsContent>

            <TabsContent value="nearby" className="mt-4">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                Nearby content would appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Dark Mode Demo */}
        <div className="mt-8 bg-[#2A2520] py-8 text-white">
          <div className="container px-4">
            <h2 className="text-xl font-bold mb-4">Dark Mode Preview</h2>
            <Card className="overflow-hidden bg-[#3A3530] border-0 shadow-md text-white">
              <CardContent className="p-4">
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=SJ"
                        alt="Sarah Johnson"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">Sarah Johnson</p>
                          <CheckCircle className="ml-1 h-4 w-4 text-secondary" />
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>Brew & Bean Coffee Shop</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      Food & Drink
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="bg-[#4A4540] p-2 rounded-md">
                      <div className="flex items-center gap-3">
                        <button className="relative rounded-full border-2 border-white h-8 w-8">
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-0 w-0 translate-x-[1px] border-y-[6px] border-l-[10px] border-r-0 border-solid border-y-transparent border-l-white" />
                          </div>
                        </button>
                        <div className="flex-1">
                          <div className="relative h-7 bg-[#4A4540] rounded-md overflow-hidden">
                            {/* Simulated waveform */}
                            <div className="absolute inset-0 flex items-center justify-around">
                              {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-[3px] bg-gray-500 rounded-full"
                                  style={{
                                    height: `${Math.sin(i / 3) * 10 + 15}px`,
                                    opacity: i < 10 ? 1 : 0.5,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-right text-xs text-gray-400 mt-1">01:24</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm">
                    I absolutely loved the coffee at Brew & Bean! The atmosphere was cozy and the staff was super
                    friendly. Definitely recommend their caramel latte!
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-gray-700 p-4">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2 text-white hover:bg-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                    <span>24</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 space-x-1 px-2 text-white hover:bg-gray-700">
                    <Heart className="h-4 w-4 text-accent" />
                    <span>12</span>
                  </Button>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-gray-700">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-gray-700">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-[#F5F0E6]">
          <div className="flex items-center justify-around p-2">
            {["Home", "Discover", "Record", "Messages", "Profile"].map((item) => (
              <button
                key={item}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-md transition-colors",
                  item === "Home" ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">{item.charAt(0)}</div>
                <span className="text-xs mt-1">{item}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

