"use client"

import { useState, type ReactNode } from "react"
import { Button, Hanzo, Text, XStack } from "@hanzo/ui"
import { Cell, Grid } from "@hanzo/ui/grid"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * The shell every page on this surface sits in: header, page, footer.
 *
 * Three rows down the page and three tracks across the header, both declared by
 * the container. The one flex run in here is the nav — a line of links that each
 * size to their own text, which is the case flexbox is for.
 */

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/grid", label: "Grid" },
  { href: "/gallery", label: "Gallery" },
]

const OUT = [
  { href: "/docs/installation", label: "Registry docs" },
  { href: "https://www.npmjs.com/package/@hanzo/ui", label: "npm" },
]

/**
 * A centred column, as one capped track rather than a flex box with an auto
 * margin: `minmax(0, 1200px)` is at most 1200 and at least nothing, and
 * `justify-content: center` puts the row's leftover space on both sides.
 */
const Wrap = ({ children, ...rest }: { children: ReactNode; gap?: number | string }) => (
  <Grid
    columns="minmax(0, 1200px)"
    style={{ justifyContent: "center", paddingLeft: 16, paddingRight: 16 }}
    {...rest}
  >
    {children}
  </Grid>
)

type Mode = "dark" | "light"

const Header = ({ theme, onTheme }: { theme: Mode; onTheme: () => void }) => {
  const here = usePathname()
  return (
    <Grid
      columns={1}
      gap={0}
      style={{
        borderBottom: "1px solid var(--border, rgb(255 255 255 / .10))",
        background: "var(--background)",
      }}
    >
      <Wrap>
        {/* The bar is a single-axis run of three groups that must WRAP when they
            stop fitting, and that is what flexbox is for. A grid could hold the
            three tracks but not wrap them without a breakpoint — and reaching
            for the grid here to make a point is the mistake this page argues
            against. Grid is for a set of alike things sized by the container;
            these three are unalike and sized by their own text. */}
        <XStack
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap="$4"
          paddingVertical="$3"
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text fontSize="$5" lineHeight="$5" fontWeight="600" color="$color12">
              @hanzo/ui
            </Text>
          </Link>
          <XStack gap="$4" alignItems="center" flexWrap="wrap">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} style={{ textDecoration: "none" }}>
                <Text fontSize="$3" color={here === n.href ? "$color12" : "$color11"}>
                  {n.label}
                </Text>
              </Link>
            ))}
          </XStack>
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            {OUT.map((o) => (
              <Link key={o.href} href={o.href} style={{ textDecoration: "none" }}>
                <Text fontSize="$3" color="$color11">
                  {o.label}
                </Text>
              </Link>
            ))}
            <Button
              size="sm"
              variant="outline"
              onPress={onTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"}`}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
          </XStack>
        </XStack>
      </Wrap>
    </Grid>
  )
}

const Footer = () => (
  <Grid
    columns={1}
    gap={0}
    style={{
      borderTop: "1px solid var(--border, rgb(255 255 255 / .10))",
      paddingTop: 28,
      paddingBottom: 28,
    }}
  >
    <Wrap>
      <Grid columns={{ min: 220, max: 3 }} gap="$5">
        <Cell>
          <Text fontSize="$2" color="$color11">
            Every component renders through @hanzo/gui, so one import runs on
            web, native and desktop.
          </Text>
        </Cell>
        <Cell>
          <Text fontSize="$2" color="$color11">
            Grid is web-only and ships at @hanzo/ui/grid, off the barrel that
            promises to run everywhere.
          </Text>
        </Cell>
        <Cell>
          <Text fontSize="$2" color="$color11">
            Hanzo — the Open AI Cloud.
          </Text>
        </Cell>
      </Grid>
    </Wrap>
  </Grid>
)

export function Surface({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Mode>("dark")
  return (
    <Hanzo theme={theme}>
      {/* Header, page, footer: three rows the container declares, and the middle
          one takes what is left. */}
      <Grid
        rows={["auto", "1fr", "auto"]}
        columns={1}
        gap={0}
        style={{ minHeight: "100svh" }}
      >
        <Cell>
          <Header
            theme={theme}
            onTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </Cell>
        <Cell>
          <Wrap>
            <Grid
              columns={1}
              gap="$10"
              style={{ paddingTop: 44, paddingBottom: 44 }}
            >
              {children}
            </Grid>
          </Wrap>
        </Cell>
        <Cell>
          <Footer />
        </Cell>
      </Grid>
    </Hanzo>
  )
}
