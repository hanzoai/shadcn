"use client"

import type { ReactNode } from "react"
import { H2, Text } from "@hanzo/ui"
import { Cell, Grid } from "@hanzo/ui/grid"

/**
 * A demonstration: what it is, why, the call, and the running result.
 *
 * Four rows the container declares, so the heading, the source block and the
 * result always share one left edge no matter how tall any of them grows.
 */
export function Sample({
  name,
  why,
  source,
  children,
}: {
  name: string
  why: string
  source: string
  children: ReactNode
}) {
  return (
    <Grid columns={1} gap="$3">
      <Cell>
        <Grid columns={1} gap="$1">
          <H2 fontSize="$6" lineHeight="$6" fontWeight="600" color="$color12">
            {name}
          </H2>
          <Text fontSize="$3" color="$color11">
            {why}
          </Text>
        </Grid>
      </Cell>
      <Cell>
        <Source>{source}</Source>
      </Cell>
      <Cell>{children}</Cell>
    </Grid>
  )
}

/** The call that produced what is under it. */
export function Source({ children }: { children: string }) {
  return (
    <Grid
      columns={1}
      gap={0}
      style={{
        background: "var(--card, rgb(255 255 255 / .04))",
        border: "1px solid var(--border, rgb(255 255 255 / .10))",
        borderRadius: 10,
        padding: "12px 16px",
        minWidth: 0,
        overflowX: "auto",
      }}
    >
      <Text
        fontFamily="$mono"
        fontSize="$2"
        color="$color11"
        style={{ whiteSpace: "pre" }}
      >
        {children}
      </Text>
    </Grid>
  )
}

/** A block a demonstration fills, so a track is visible without a border on it. */
export function Tile({ children }: { children: ReactNode }) {
  return (
    <Grid
      columns={1}
      gap={0}
      style={{
        alignContent: "center",
        background: "var(--muted, rgb(255 255 255 / .06))",
        border: "1px solid var(--border, rgb(255 255 255 / .10))",
        borderRadius: 8,
        minHeight: 56,
        padding: "12px 14px",
        // A demonstration of a track that holds its width must CLIP what
        // overflows it. Left visible, the unbreakable string in the fixed-count
        // sample scrolls the document sideways at 390 — a different failure
        // from the one being shown, and the one a reader would blame the grid
        // for.
        overflow: "hidden",
      }}
    >
      <Text fontSize="$3" color="$color12">
        {children}
      </Text>
    </Grid>
  )
}
