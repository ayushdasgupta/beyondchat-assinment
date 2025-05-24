"use client";
import { useState } from "react";
import { ConversationItem } from '@/components/conversation-item';
import { ChatMessage } from '@/components/chat-message';
import { AICopilot } from '@/components/ai-copilot';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

type Conversation = {
  id: string;
  name: string;
  preview: string;
  assigneeInitials: string;
  label?: string;
  messages: Message[];
};

type Message = {
  id: string;
  sender: string;
  text: string;
  isTrain: boolean;
  seenStatus?: string;
  timestamp?:string
};


export default function Dashboard() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [, setMessages] = useState<Message[]>([]);

  const handleConversationSelect = (conv: Conversation) => {
    setSelectedConversation(conv);
    setIsSheetOpen(false); 
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'Agent',
      timestamp: new Date().toISOString(),
      isTrain: false
    };

    // Update conversation messages
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    };

    // Update state
    setSelectedConversation(updatedConversation);
    setMessages(updatedConversation.messages);
    setMessage('');

    // Here you would typically make an API call to save the message
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Mobile Sidebar */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger className="md:hidden fixed top-2 left-2">
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <InboxSidebar onSelect={handleConversationSelect} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-96 border-r bg-background">
        <InboxSidebar onSelect={handleConversationSelect} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 lg:mr-80">
        {selectedConversation ? (
          <>
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{selectedConversation.name}</h2>
                <Badge variant="outline">Train</Badge>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  sender={message.sender}
                  message={message.text}
                  isTrain={message.isTrain}
                  seenStatus={message.seenStatus}
                />
              ))}
            </div>

            <AICopilot />

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input placeholder="Type a message..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}


function InboxSidebar({ onSelect }: { onSelect: (conv: Conversation) => void }) {
  return (
    <>
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Your inbox</h1>

        </div>
      </div>

      <div className="space-y-1 p-2">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            name={conv.name}
            preview={conv.preview}
            label={conv.label}
            assigneeInitials={conv.assigneeInitials}
            onClick={() => onSelect(conv)}
          />
        ))}
      </div>
    </>
  );
}
const conversations: Conversation[] = [
  {
    id: "1",
    name: "Luis - Osinub",
    preview: "Hey! I have a question...",
    assigneeInitials: "L",
    messages: [
      {
        id: "m1",
        sender: "Luis",
        text: "I bought a product from your store in November...",
        isTrain: true,
        seenStatus: "Train"
      }
    ]
  },
  {
    id: "2",
    name: "Sophia - Returns",
    preview: "Hi, I need help with a return...",
    assigneeInitials: "S",
    messages: [
      {
        id: "m2",
        sender: "Sophia",
        text: "I received the wrong size in my order last week...",
        isTrain: true,
        seenStatus: "Train"
      }
    ]
  },
  {
    id: "3",
    name: "Raj - Payment Issue",
    preview: "Urgent: Payment failed problem...",
    assigneeInitials: "R",
    messages: [
      {
        id: "m3",
        sender: "Raj",
        text: "My card keeps getting declined during checkout...",
        isTrain: true,
        seenStatus: "Train"
      }
    ]
  },
  {
    id: "4",
    name: "Emma - Delivery Query",
    preview: "Tracking information mismatch...",
    assigneeInitials: "E",
    messages: [
      {
        id: "m4",
        sender: "Emma",
        text: "The tracking shows delivered but I never received my package...",
        isTrain: true,
        seenStatus: "Train"
      }
    ]
  }
];