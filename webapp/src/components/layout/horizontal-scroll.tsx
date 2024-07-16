"use client"
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from "react"
// type="always"
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  return <ScrollArea.Root className="ScrollDashboard">
    <ScrollArea.Viewport className="ScrollDashboardViewport">
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="ScrollDashboardScrollbar" orientation="horizontal">
      <ScrollArea.Thumb className="ScrollDashboardThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollDashboardCorner" />
  </ScrollArea.Root>
}