'use client'
import {motion} from 'motion/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:block w-80 border-r bg-background h-full fixed"
      >
        {children}
      </motion.aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger className="md:hidden p-2">
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          {children}
        </SheetContent>
      </Sheet>
    </>
  )
}