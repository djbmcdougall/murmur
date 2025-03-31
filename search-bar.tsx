"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function SearchBar({ className = "" }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = (value: string) => {
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search recommendations..."
          className="w-full rounded-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
          onClick={() => setOpen(true)}
        />
        {/* Removed the keyboard shortcut indicator */}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search recommendations, places, or people..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Searches">
            <CommandItem onSelect={() => handleSearch("coffee shop")}>
              <Search className="mr-2 h-4 w-4" />
              <span>coffee shop</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("hiking trails")}>
              <Search className="mr-2 h-4 w-4" />
              <span>hiking trails</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Trending">
            <CommandItem onSelect={() => handleSearch("italian restaurant")}>
              <Search className="mr-2 h-4 w-4" />
              <span>italian restaurant</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("summer reads")}>
              <Search className="mr-2 h-4 w-4" />
              <span>summer reads</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

