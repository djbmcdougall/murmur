import { Utensils, Plane, ShoppingBag, Film, Book, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type CategoryIconType = "food" | "travel" | "shopping" | "entertainment" | "custom" | "books" | "all"

interface CategoryIconProps {
  type: CategoryIconType
  className?: string
  size?: number
}

export default function CategoryIcon({ type, className, size = 24 }: CategoryIconProps) {
  // Use Lucide icons instead of image files
  const renderIcon = () => {
    switch (type) {
      case "food":
        return <Utensils size={size} className="text-primary" />
      case "travel":
        return <Plane size={size} className="text-primary" />
      case "shopping":
        return <ShoppingBag size={size} className="text-primary" />
      case "entertainment":
        return <Film size={size} className="text-primary" />
      case "books":
        return <Book size={size} className="text-primary" />
      case "all":
        return <Globe size={size} className="text-primary" />
      default:
        return <Globe size={size} className="text-primary" />
    }
  }

  return <div className={cn("flex items-center justify-center", className)}>{renderIcon()}</div>
}

