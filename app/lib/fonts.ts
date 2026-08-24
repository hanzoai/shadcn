import localFont from "next/font/local"

// Canonical Hanzo typography, one source of truth for the whole site:
//   text, UI, display, heading -> Zen      (@hanzo/font)
//   code, data                 -> Zen Mono
//
// Zen replaces Basel Grotesk and Geist. The variable file carries 100-900, so
// one face covers every weight the surface asks for.
//
// The variables are named `--font-sans` / `--font-mono` because those are the
// names both consumers already read: Tailwind v4 resolves `font-sans` through
// `--font-sans` (styles/globals.css) and @hanzo/ui binds the same two. The old
// file bound `--font-basel-sans`, which nothing consumed, so the face was
// downloaded and never used.
//
// size-adjust states the x-height correction once, and the number is 93.21%.
//
// DIVIDE BY THE EM, NOT THE CAP. `size-adjust` scales the em, so matching
// x-heights means matching x-per-em:
//
//     Basel  xh 494 / upem 1000 = 0.4940
//     Zen    xh 530 / upem 1000 = 0.5300
//     factor = 0.4940 / 0.5300  = 0.9321
//
// This said 96.2%, from the same two faces' x-per-CAP (0.7180 / 0.7465). Those
// cap ratios are correct and the arithmetic on them is correct — they just
// answer a question nobody asked, because no CSS property scales a glyph by its
// cap height. The result was type still 3.2% larger than the Basel it replaced:
// better than the 6.8% of no correction, and close enough to read as done while
// being wrong. @hanzo/font exports it as BASEL_XHEIGHT_FACTOR.
//
// The matching weight correction -- Basel Book is Zen 497, Basel Medium is Zen
// 606 -- is stated once too, on Tailwind's weight scale in styles/globals.css.
//
// `src` is a path and not a package name: next/font/local hands it to the
// bundler with a leading "./", so a bare specifier resolves as
// `./@hanzo/font/...` and the build fails to find it. The dependency is
// declared in this package, so pnpm links it one level up from here.
export const fontSans = localFont({
  src: "../node_modules/@hanzo/font/dist/fonts/zen-sans/Zen-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  // block, never swap. `swap` paints the platform sans until the face arrives —
  // DejaVu on Linux — so the first frame of every cold load is the one typeface
  // this migration exists to stop showing. The face is self-hosted and ~70KB;
  // holding the text for it costs less than showing the wrong one.
  display: "block",
  declarations: [{ prop: "size-adjust", value: "93.21%" }],
})

export const fontMono = localFont({
  src: "../node_modules/@hanzo/font/dist/fonts/zen-mono/ZenMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-mono",
  display: "block",
})
