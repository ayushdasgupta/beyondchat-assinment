
"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

export function AICopilot() {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop - Always Visible */}
      {isDesktop && (
        <div className="w-80 border-l bg-background hidden md:block fixed right-0 top-0 h-full">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">AI Copilot</h3>
          </div>
          <CopilotContent />
        </div>
      )}

      {/* Mobile - Pop-up Sheet */}
      {!isDesktop && (
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="lg:hidden fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl h-[85vh]">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">AI Copilot</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CopilotContent />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

function CopilotContent() {
  return (
    <div className="p-4 space-y-4 h-[calc(100%-56px)] overflow-auto">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">Hi, I &apos; m Fin AI Copilot</h4>
          <p className="text-sm text-muted-foreground">
            Ask me anything about this conversation
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer">
          How do I get a refund?
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          What&apos;s the return policy?
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          Suggest similar products
        </Badge>
      </div>
    </div>
  );
}