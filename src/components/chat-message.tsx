// components/chat-message.tsx
'use client'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function ChatMessage({
  sender,
  message,
  isTrain,
  seenStatus,
}: {
  sender: string
  message: string
  isTrain: boolean
  seenStatus?: string
}) {
  const isUser = sender.toLowerCase() !== 'agent'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isUser ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback>{sender[0]}</AvatarFallback>
      </Avatar>

      <div className={`space-y-1 ${isUser ? 'items-start' : 'items-end'}`}>
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="font-medium">{sender}</span>
          {isTrain && <Badge variant="outline">Train</Badge>}
        </div>

        <div
          className={cn(
            "p-3 rounded-lg max-w-2xl",
            isUser 
              ?  "bg-muted text-foreground rounded-bl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          )}
        >
          {message}
        </div>

        {seenStatus && (
          <span className={`text-sm text-muted-foreground ${isUser ? 'text-left' : 'text-right'}`}>
            Seen - {seenStatus}
          </span>
        )}
      </div>
    </motion.div>
  )
}