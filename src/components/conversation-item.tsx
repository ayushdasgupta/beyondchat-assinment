// components/conversation-item.tsx
'use client'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function ConversationItem({
  name,
  preview,
  label,
  assigneeInitials,
  onClick,
}: {
  name: string
  preview: string
  label?: string
  assigneeInitials: string
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer border"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{preview}</p>
          {label && (
            <Badge variant="secondary" className="mt-1">
              {label}
            </Badge>
          )}
        </div>
        <Avatar className="h-6 w-6">
          <AvatarFallback>{assigneeInitials}</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  )
}