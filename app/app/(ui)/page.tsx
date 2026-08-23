import type { Metadata } from "next"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  H1,
  H2,
  Input,
  Switch,
  Text,
  XStack,
} from "@hanzo/ui"
import { version as guiVersion } from "@hanzo/gui/package.json"
import { Cell, Grid } from "@hanzo/ui/grid"
import { version as uiVersion } from "@hanzo/ui/package.json"
import Link from "next/link"

import { Frame } from "./frame"
import { Source, Tile } from "./sample"

export const metadata: Metadata = {
  title: "@hanzo/ui",
  description:
    "The Hanzo component library on one substrate. Every layout on this page is a grid whose tracks come from the container.",
}

export const dynamic = "force-static"

const FACTS = [
  {
    head: "One substrate",
    body: "Every component renders through @hanzo/gui on the @hanzo/tokens scale, so one import runs on web, native and desktop. No Radix, no Tailwind, no cva.",
  },
  {
    head: "One root",
    body: "<Hanzo> carries the config, the generated stylesheet and the theme. That is the entire setup — no CSS import, no generator script, no bundler alias.",
  },
  {
    head: "One list",
    body: "The gallery is the specification of what this package styles. The CSS generator, the unit test and the consumer test all render THAT list.",
  },
  {
    head: "Tracks, not breakpoints",
    body: "Grid takes one prop for the columns. The responsive form measures the column it is in, so a block laid out this way is correct inside a sidebar it has never seen.",
  },
]

export default function Overview() {
  return (
    <Grid columns={1} gap="$11">
      {/* Hero: prose in one track, the argument running in the other. Two tracks
          on a wide page, one on a narrow one, and the switch is the track floor
          rather than a breakpoint. */}
      <Cell>
        <Grid columns={{ min: 380 }} gap="$7" style={{ alignItems: "center" }}>
          <Cell>
            <Grid columns={1} gap="$4">
              {/* Read off the installed packages, so the page cannot claim a
                  version it is not running. */}
              <XStack gap="$2" alignItems="center">
                <Badge>{uiVersion}</Badge>
                <Text fontSize="$2" color="$color11">
                  on @hanzo/gui {guiVersion}
                </Text>
              </XStack>
              <H1 fontSize="$13" lineHeight="$13" fontWeight="700" color="$color12">
                The Hanzo component library
              </H1>
              <Text fontSize="$5" color="$color11">
                One import surface, one substrate, one root. This page — its
                header, its footer and every block on it — is laid out with the
                grid it documents.
              </Text>
              <XStack gap="$3" alignItems="center">
                <Link href="/grid" style={{ textDecoration: "none" }}>
                  <Button>The grid system</Button>
                </Link>
                <Link href="/gallery" style={{ textDecoration: "none" }}>
                  <Button variant="outline">Every component</Button>
                </Link>
              </XStack>
              <Source>{`pnpm add @hanzo/ui`}</Source>
            </Grid>
          </Cell>
          <Cell>
            {/* The claim, running. Same grid, same props, a column the reader
                controls — the track count follows the column, not the window. */}
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
          </Cell>
        </Grid>
      </Cell>

      <Cell>
        <Grid columns={{ min: 260, max: 4 }} gap="$4">
          {FACTS.map((f) => (
            <Cell key={f.head}>
              <Card>
                <CardHeader>
                  <CardTitle>{f.head}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text fontSize="$3" color="$color11">
                    {f.body}
                  </Text>
                </CardContent>
              </Card>
            </Cell>
          ))}
        </Grid>
      </Cell>

      {/* Components, live. A sample rather than the catalogue — the gallery holds
          the one list, and a second copy of it here is how the two drift. */}
      <Cell>
        <Grid columns={1} gap="$4">
          <Cell>
            <Grid columns={1} gap="$1">
              <H2 fontSize="$9" lineHeight="$9" fontWeight="700" color="$color12">
                Components
              </H2>
              <Text fontSize="$3" color="$color11">
                Rendered here, not pictured. Every one of them, in every
                variant, is on the gallery.
              </Text>
            </Grid>
          </Cell>
          <Cell>
            <Grid columns={{ min: 300, max: 3 }} gap="$4">
              <Cell>
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>Nine variants, six sizes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <XStack gap="$2" flexWrap="wrap">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                    </XStack>
                  </CardContent>
                </Card>
              </Cell>
              <Cell>
                <Card>
                  <CardHeader>
                    <CardTitle>Fields</CardTitle>
                    <CardDescription>
                      Behaviour comes from the matching gui primitive.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Grid columns={1} gap="$3">
                      <Input placeholder="name@hanzo.ai" />
                      <XStack gap="$3" alignItems="center">
                        <Switch />
                        <Text fontSize="$3" color="$color11">
                          Ship it hardened
                        </Text>
                      </XStack>
                    </Grid>
                  </CardContent>
                </Card>
              </Cell>
              <Cell>
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Four tones, one shape.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <XStack gap="$2" flexWrap="wrap">
                      <Badge>default</Badge>
                      <Badge variant="secondary">secondary</Badge>
                      <Badge variant="destructive">destructive</Badge>
                      <Badge variant="outline">outline</Badge>
                    </XStack>
                  </CardContent>
                </Card>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  )
}
