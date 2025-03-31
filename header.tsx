import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"
import NotificationDropdown from "@/components/notification-dropdown"

export default function Header({ showSearch = true }) {
  return (
    <header className="sticky top-0 z-40 border-b border-muted bg-gradient-periwinkle shadow-periwinkle-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emoticon-lzH7iAcdCUbnTF94t2ErOuKWmJJ19s.png"
            alt="Murmur Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-tight ml-1 text-foreground">murmur</span>
        </Link>

        {showSearch && (
          <div className="flex-1 mx-4">
            <SearchBar />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/30">
              <Image
                src="/placeholder.svg?height=32&width=32&text=AM"
                alt="User Avatar"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

