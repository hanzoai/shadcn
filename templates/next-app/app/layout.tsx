import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Zen, the Hanzo type family. Self-hosted from @hanzo/font, so the first paint
// does not wait on a third-party host. next/font/local prefixes `src` with
// "./", so it takes the linked path rather than the package name.
const fontSans = localFont({
  src: "../node_modules/@hanzo/font/dist/fonts/zen-sans/Zen-Variable.woff2",
  weight: "100 900",
  variable: "--font-sans",
})

const fontMono = localFont({
  src: "../node_modules/@hanzo/font/dist/fonts/zen-mono/ZenMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
