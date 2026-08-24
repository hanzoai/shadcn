import {
  Noto_Sans_Arabic as FontNotoSansArabic,
  Noto_Sans_Hebrew as FontNotoSansHebrew,
  Inter,
} from "next/font/google"
import { ZenMono } from "@hanzo/font/mono"
import { ZenSans } from "@hanzo/font/sans"

import { cn } from "@/lib/utils"

// Zen is the typeface for Hanzo, Lux and Zoo alike, and it is SELF-HOSTED —
// @hanzo/font ships the woff2, so there is no render-blocking request to a host
// we do not control on the critical path of every docs page. The faces are
// pre-configured next/font objects, not factories: `ZenSans({...})` throws.
//
// They declare `--font-zen-sans` / `--font-zen-mono`, which is the package's
// contract and not this app's. globals.css points the `--font-sans` and
// `--font-mono` theme tokens at them rather than either side renaming: the
// package cannot know what a consumer calls the role, and re-declaring the face
// here with this app's variable name would mean a second `localFont` pointing
// into node_modules by relative path.
const fontSans = ZenSans
const fontMono = ZenMono

// Inter stays for the one legacy theme that names it (legacy-themes.css binds
// --font-inter). It is a theme's own choice, not the default.
const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Arabic and Hebrew stay on Noto. Zen is a Latin family, so dropping these
// would not move those scripts to Zen — it would drop them to whatever the
// platform happens to have, which is the failure this migration exists to end.
const fontNotoSansArabic = FontNotoSansArabic({
  subsets: ["latin"],
  variable: "--font-ar",
})

const fontNotoSansHebrew = FontNotoSansHebrew({
  subsets: ["latin"],
  variable: "--font-he",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
  fontNotoSansArabic.variable,
  fontNotoSansHebrew.variable
)
