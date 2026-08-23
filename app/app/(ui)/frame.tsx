"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Text, YStack } from "@hanzo/ui"

/**
 * A column the reader can drag.
 *
 * The whole argument for grid over breakpoints is that `{min, max}` measures the
 * COLUMN, and a breakpoint measures the window. Those are the same number only
 * on a page with one column, which is the page nobody ships. Resizing the
 * browser cannot tell the two apart; resizing one column can, so the reader
 * drags this and watches the track count change with the window untouched.
 *
 * The handle is the browser's own (`resize: horizontal`) — a drag implementation
 * here would be a second answer to a question CSS already answers.
 */
export function Frame({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <YStack gap="$2">
      <div
        ref={box}
        style={{
          resize: "horizontal",
          overflow: "auto",
          width: "100%",
          minWidth: 180,
          maxWidth: "100%",
          padding: 12,
          border: "1px dashed var(--border, rgb(255 255 255 / .16))",
          borderRadius: 10,
        }}
      >
        {children}
      </div>
      <Text fontFamily="$mono" fontSize="$1" color="$color11">
        {w ? `column ${w}px — drag the bottom-right corner` : "drag the bottom-right corner"}
      </Text>
    </YStack>
  )
}
