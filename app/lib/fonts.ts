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
// size-adjust states the x-height correction once. Zen's x-height is 0.746 of
// its cap where Basel's was 0.718, so at the same nominal size Zen's lowercase
// reads about 4% larger. 96.2% is the only knob that shrinks glyphs without
// moving a rem of layout, and it belongs on the face rather than on a type
// scale spread across four hundred components. The matching weight correction
// -- Basel Book is Zen 497, Basel Medium is Zen 606 -- is stated once too, on
// Tailwind's weight scale in styles/globals.css.
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
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "96.2%" }],
})

export const fontMono = localFont({
  src: "../node_modules/@hanzo/font/dist/fonts/zen-mono/ZenMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
})
