"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface FlagContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
  contentType?: "recommendation" | "comment" | "profile"
}

export function FlagContentDialog({
  open,
  onOpenChange,
  contentId,
  contentType = "recommendation",
}: FlagContentDialogProps) {
  const [reason, setReason] = useState<string>("")
  const [additionalInfo, setAdditionalInfo] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = () => {
    // In a real app, this would send the report to the server
    console.log("Flagging content:", { contentId, contentType, reason, additionalInfo })

    // Show confirmation toast
    toast({
      title: "Content reported",
      description: "Thank you for helping keep Murmur safe and trustworthy.",
      variant: "success",
    })

    // Close dialog and reset form
    onOpenChange(false)
    setReason("")
    setAdditionalInfo("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-muted">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-warning">
              <AlertTriangle className="h-3 w-3 text-warning-foreground" />
            </div>
            Report Content
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us understand why this content should be reviewed by our moderation team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="misinformation" id="misinformation" />
                <Label htmlFor="misinformation">Misinformation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inappropriate" id="inappropriate" />
                <Label htmlFor="inappropriate">Inappropriate content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spam" id="spam" />
                <Label htmlFor="spam">Spam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="harassment" id="harassment" />
                <Label htmlFor="harassment">Harassment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional information (optional)</Label>
            <Textarea
              id="additional-info"
              placeholder="Please provide any additional details that might help our team..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="resize-none bg-surface-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-surface-white">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

