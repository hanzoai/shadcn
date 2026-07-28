# @hanzo/shadcn

The shadcn-compatible React component surface, on its own.

```sh
pnpm add @hanzo/shadcn
```

```tsx
import { Button, Dialog, DialogContent, DialogTrigger, cn } from '@hanzo/shadcn'
```

## Why this moved

`@hanzo/ui` renders on `@hanzo/gui` — one backend, cross-platform (web, native,
desktop). It used to carry a second, parallel React implementation built on Radix
and Tailwind, and that implementation was the *default*: the root barrel was
`export * from './backends/shadcn'`. So the library's primary export path was the
backend we were trying to stop treating as primary.

Two implementations of a Button, reachable by the same import, is not a choice —
it is an ambiguity. This package resolves it by moving. `@hanzo/ui` keeps one
backend; the shadcn components keep their API, their behaviour, and their git
history, and live here.

Nothing was rewritten. The 25 files are byte-identical to the ones published in
`@hanzo/ui@8.0.26`, apart from the two deliberate changes below.

## What is in it

Twenty-two components plus a toaster, exporting 89 names from a single barrel:

`AspectRatio` · `Avatar` · `Badge` · `Button` · `Card` · `Checkbox` ·
`Collapsible` · `Command` · `Dialog` · `DropdownMenu` · `Input` · `Label` ·
`Popover` · `Progress` · `ScrollArea` · `Select` · `Separator` · `Slider` ·
`Switch` · `Tabs` · `Textarea` · `Toaster` · `Tooltip` — each with its
compound parts (`DialogContent`, `SelectTrigger`, …) — plus `buttonVariants`,
`badgeVariants`, `toast`, and `cn`.

There are no per-component subpaths. The build is ESM with `sideEffects: false`,
so importing one name from the barrel tree-shakes to one component. One door.

## How to style it

This package ships **no CSS**. It is styled with the standard shadcn token
classes (`bg-popover`, `border-border`, `text-muted-foreground`, …), never
app-private names, so it renders correctly against any host that defines the
standard variables — which is what every shadcn app's `globals.css` already does,
and what `@hanzo/ui/theme.css` does for Hanzo apps.

The contract is these eighteen, in both light and dark:

```
--background   --foreground
--card         --card-foreground
--popover      --popover-foreground
--primary      --primary-foreground
--secondary    --secondary-foreground
--muted        --muted-foreground
--accent       --accent-foreground
--destructive
--border       --input        --ring
```

Radii, shadows and spacing are plain Tailwind utilities and need nothing extra.

Deliberately not shipping a stylesheet is the point: a component package that
carries its own palette becomes a competing source of truth for colour, and
Hanzo already has more of those than it wants.

## How to compose it

The components are presentational and host-agnostic. They hold no data layer, no
router, no fetch. Compose them:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, cn } from '@hanzo/shadcn'

export function Plan({ name, price, featured }: PlanProps) {
  return (
    <Card className={cn(featured && 'border-primary')}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{price}</p>
        <Button variant={featured ? 'default' : 'outline'}>Choose</Button>
      </CardContent>
    </Card>
  )
}
```

`cn` is `clsx` + `tailwind-merge`: the caller's classes win over the component's
defaults, so `className` is a real override and not a coin flip.

`Toaster` reads the active theme through `next-themes`, which is why `next-themes`
is a **peer** dependency and not a regular one — `useTheme()` has to read the same
provider context your app rendered. Two copies of a context provider is two
themes. Same reason `react` is a peer.

## Dependencies

Twenty-three runtime dependencies, and each one is a component's behaviour:

- **17 × `@radix-ui/react-*`** — accessibility, portalling, focus management and
  keyboard handling for avatar, checkbox, collapsible, dialog, dropdown-menu,
  label, popover, progress, scroll-area, select, separator, slider, switch, tabs,
  tooltip, aspect-ratio, and `Slot` for `asChild`. One package per primitive is
  Radix's own packaging, not our fan-out.
- **`cmdk`** — the command palette behind `Command`.
- **`sonner`** — the toast queue behind `Toaster`.
- **`lucide-react`** — the icon set. One icon set, not two: `Checkbox` used to
  pull `CheckIcon` from `@radix-ui/react-icons` while six other components pulled
  the same-named icon from `lucide-react`. Now it uses lucide, and
  `@radix-ui/react-icons` is gone — an entire dependency removed for one glyph
  that was already present.
- **`class-variance-authority`** — the variant API. `buttonVariants` and
  `badgeVariants` are part of the public surface, so this is not an
  implementation detail.
- **`clsx`** + **`tailwind-merge`** — the two halves of `cn`.

Peers: `react`, `react-dom`, `next-themes`.

`cn` itself is **vendored**, not imported from `@hanzo/ui`. Seventeen lines are
cheaper than a dependency cycle between a package and the package it was
extracted out of.

## Relationship to `@hanzo/ui-shadcn`

`@hanzo/ui-shadcn@5.x` is the older, larger v5 line — 129 export subpaths,
app-private colour names (`bg-gray-600`, `text-white`), and site/commerce concerns
mixed in with primitives. It is frozen and takes no new adopters.

`@hanzo/shadcn` is its descendant, not its sibling: the git history in this repo
runs straight back through `pkgs/ui/primitives/` to `pkgs/luxdefi-ui/primitives/`
and, before that, to shadcn/ui's own registry. What changed on the way here was
the tokens — every app-private colour was replaced with a standard one, which is
why the same-named files differ on every line that matters.

So there is one destination, not two. v5 consumers migrate here when they leave
v5; nobody merges the two.

## License

MIT. The components originate in [shadcn/ui](https://github.com/shadcn-ui/ui),
also MIT, and this repository preserves that history.
