import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SelectOption {
  id: string
  name: string
}

interface CascadingSelectProps {
  label: string
  placeholder: string
  options: SelectOption[]
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  className?: string
}

export function CascadingSelect({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  disabled = false,
  required = false,
  className
}: CascadingSelectProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-foreground bg-background rounded-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background border-2 border-foreground rounded-none">
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}