import type { Metadata } from "next"
import { Card, CardContent, H1, Text } from "@hanzo/ui"
import { Cell, Grid } from "@hanzo/ui/grid"

import { Frame } from "../frame"
import { Sample, Source, Tile } from "../sample"

export const metadata: Metadata = {
  title: "Grid",
  description:
    "One prop carries the tracks. A count, a list, a written track list, or a track floor that measures the column instead of the window.",
}

export const dynamic = "force-static"

export default function GridPage() {
  return (
    <Grid columns={1} gap="$10">
      <Cell>
        <Grid columns="minmax(0, 780px)" gap="$3">
          <H1 fontSize="$12" lineHeight="$12" fontWeight="700" color="$color12">
            Grid
          </H1>
          <Text fontSize="$5" color="$color11">
            The tracks come from the container, not from the children. Equal
            columns are structural rather than arithmetic, and no child can
            widen its own track.
          </Text>
          <Text fontSize="$3" color="$color11">
            One prop carries them. <Text fontFamily="$mono">columns</Text> takes
            a count, a list, a written track list, or a floor;{" "}
            <Text fontFamily="$mono">rows</Text> is the same down the page, and{" "}
            <Text fontFamily="$mono">Cell</Text> spans and places. There are no
            breakpoint props anywhere in it, and this page is laid out with it.
          </Text>
          <Source>{`import { Grid, Cell } from '@hanzo/ui/grid'`}</Source>
        </Grid>
      </Cell>

      <Cell>
        <Sample
          name="A count"
          why="Three equal tracks. Each is minmax(0, 1fr), never a bare 1fr — 1fr means minmax(auto, 1fr), and auto floors a track at its content, so one long word would widen its own column and narrow every sibling."
          source={`<Grid columns={3} gap="$3">`}
        >
          <Grid columns={3} gap="$3">
            <Tile>one</Tile>
            <Tile>two</Tile>
            {/* Unbreakable, and wider than its track. minmax(0,1fr) is the only
                reason the row stays even. */}
            <Tile>
              <span style={{ whiteSpace: "nowrap" }}>
                MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
              </span>
            </Tile>
          </Grid>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="A list"
          why="One entry per track, in the units CSS already has. Two thirds and one third, stated rather than computed."
          source={`<Grid columns={['2fr', '1fr']} gap="$3">`}
        >
          <Grid columns={["2fr", "1fr"]} gap="$3">
            <Tile>2fr</Tile>
            <Tile>1fr</Tile>
          </Grid>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="A written track list"
          why="Anything CSS accepts for grid-template-columns passes through untouched, so the prop never becomes the reason to drop out of the component."
          source={`<Grid columns="repeat(3, 1fr)" gap="$3">`}
        >
          <Grid columns="repeat(3, 1fr)" gap="$3">
            <Tile>a</Tile>
            <Tile>b</Tile>
            <Tile>c</Tile>
          </Grid>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="A floor, and a cap"
          why="As many equal columns as fit, none narrower than 260px, and never more than three. This is the one shape a plain track list cannot say, and the reason there are no breakpoints: it measures the COLUMN. Drag the frame and watch the count change while the window stands still."
          source={`<Grid columns={{ min: 260, max: 3 }} gap="$3">`}
        >
          <Frame>
            <Grid columns={{ min: 260, max: 3 }} gap="$3">
              <Tile>1</Tile>
              <Tile>2</Tile>
              <Tile>3</Tile>
              <Tile>4</Tile>
              <Tile>5</Tile>
              <Tile>6</Tile>
            </Grid>
          </Frame>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="A floor wider than a phone"
          why="min(900px, 100%) is what keeps this safe below 900. A bare minmax(900px, 1fr) forces a 900px track into a 390px window and the document scrolls sideways; here it lays out one full-width track instead."
          source={`<Grid columns={{ min: 900 }} gap="$3">`}
        >
          <Grid columns={{ min: 900 }} gap="$3">
            <Tile>wide</Tile>
            <Tile>wide</Tile>
          </Grid>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="Cells span and place"
          why="A number spans that many tracks; a string places it. col across, row down — one name per axis, because CSS already has one, and a caller never writes gridColumn by hand."
          source={`<Grid columns={3} rows={2} gap="$3">
  <Cell col={2}>…</Cell>
  <Cell row={2}>…</Cell>
  <Cell col="1 / -1">…</Cell>
</Grid>`}
        >
          <Grid columns={3} rows={2} gap="$3">
            <Cell col={2}>
              <Tile>col={2} — two tracks</Tile>
            </Cell>
            <Cell row={2}>
              <Tile>row={2} — two rows</Tile>
            </Cell>
            {/* Two plain cells, so the spans above have something to flow
                around and the placement is legible rather than a hole. */}
            <Cell>
              <Tile>plain</Tile>
            </Cell>
            <Cell>
              <Tile>plain</Tile>
            </Cell>
            <Cell col="1 / -1">
              <Tile>col=&quot;1 / -1&quot; — the whole row</Tile>
            </Cell>
          </Grid>
        </Sample>
      </Cell>

      <Cell>
        <Sample
          name="Rows size to content"
          why="A card grows down its track; it does not clip, and it does not push its neighbour. Nothing here states a height."
          source={`<Grid columns={{ min: 260 }} gap="$4">`}
        >
          <Grid columns={{ min: 260 }} gap="$4">
            <Card>
              <CardContent>
                <Text color="$color12">One line.</Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Text color="$color12">
                  Four times the content of its neighbour, and the row is as
                  tall as the tallest cell rather than as tall as whichever cell
                  was measured first.
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Text color="$color12">One line.</Text>
              </CardContent>
            </Card>
          </Grid>
        </Sample>
      </Cell>
    </Grid>
  )
}
