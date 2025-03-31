"use client"

import type React from "react"

import { useState } from "react"
import { ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface AddCategoryDialogProps {
  onAdd: (category: { name: string; icon: string }) => void
}

export default function AddCategoryDialog({ onAdd }: AddCategoryDialogProps) {
  const [name, setName] = useState("")
  const [icon, setIcon] = useState<File | null>(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    // In a real app, you would upload the icon and get a URL
    // For now, we'll use a placeholder
    onAdd({
      name,
      icon: "/placeholder.svg",
    })

    setName("")
    setIcon(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto flex-col py-4 border-dashed">
          <ImagePlus className="h-8 w-8 mb-1 text-blue-500" />
          <span className="text-xs">Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new category to organize recommendations.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Restaurants, Movies, Shopping"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Category Icon</Label>
              <div className="flex items-center space-x-4">
                {icon ? (
                  <div className="relative h-16 w-16 rounded-lg border">
                    <img
                      src={URL.createObjectURL(icon) || "/placeholder.svg"}
                      alt="Category icon preview"
                      className="h-full w-full object-contain p-2"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                      onClick={() => setIcon(null)}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-dashed">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setIcon(file)
                      }}
                    />
                  </label>
                )}
                <div className="text-sm text-muted-foreground">Upload a square icon (recommended size: 64x64px)</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name.trim()}>
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

