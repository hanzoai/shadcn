import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = { title: "@hanzo/ui gallery" }

/**
 * A document with nothing in it but @hanzo/ui.
 *
 * The gallery is a harness: it renders every portalled surface OPEN so their
 * panels emit rules, which is thirteen full-viewport fixed layers. Correct for
 * generating a stylesheet, fatal for a page — measured, every one of them sits
 * at z-index 5001/105001 over the whole viewport and eats the reader's clicks.
 *
 * A portal escapes any wrapper and lands on the body, so the only container
 * that holds one is a DOCUMENT. This is that document; `/gallery` frames it.
 * Same module, no second list, and the harness keeps behaving like a harness.
 */
export default function BareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}
