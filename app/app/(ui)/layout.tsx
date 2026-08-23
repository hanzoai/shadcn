import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"

import { Surface } from "./surface"

/**
 * The @hanzo/ui root.
 *
 * This is a SECOND root layout, not a nested one. The registry surfaces keep
 * theirs (`components/document.tsx`: Tailwind's body, next-themes, the Radix
 * toasters) because Tailwind is what the registry ships to customers. Nothing
 * from that shell may reach this tree — a Tailwind `font-sans antialiased` on
 * the body outranks the zero-specificity `:where(html, body)` rule @hanzo/ui
 * declares, which is exactly how the live site came to render its own component
 * library in `ui-sans-serif`.
 *
 * `<Hanzo>` (inside Surface) is the whole setup: it carries the gui config, the
 * generated stylesheet and the theme. There is no CSS import here and no
 * generator step.
 *
 * Zen is bound the way @hanzo/ui/core documents it — the host loads the faces
 * and binds `--font-sans` / `--font-mono`. next/font self-hosts both, so no
 * request leaves the origin, and lib/fonts.ts is the one place that names them.
 * Those are the names @hanzo/ui reads from 8.3.2 on; 8.3.1 and earlier read a
 * face-named token instead, and on those this surface renders the package's own
 * fallback rather than Zen.
 *
 * On BOTH elements, and the second one is load-bearing. next/font binds through
 * a class, and on <html> that lands on `:root` — the same element and the same
 * specificity as the package's own fallback, so the package can win on source
 * order and `--font-sans` resolve to its literal default. A machine with that
 * default INSTALLED renders correctly and a visitor's does not — measured
 * exactly that way. A declaration on <body> is the body's own, so it beats an
 * inherited one whatever the package does.
 */

const title = "@hanzo/ui"
const description =
  "The Hanzo component library, on one substrate. Grid tracks come from the container, so a layout answers to the column it is in — not to a breakpoint."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title,
    description,
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }] },
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
}

export default function UiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <Surface>{children}</Surface>
      </body>
    </html>
  )
}
