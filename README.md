# shadcn

Everything shadcn-lineage at Hanzo, in one repo: the CLI, the component
registry it serves, the docs sites that publish that registry, and the project
templates it scaffolds.

```sh
npx shadcn@latest add button       # the CLI
pnpm add @hanzo/shadcn             # the components, as a package
```

## What is here

| Path | |
|---|---|
| `pkg/cli` | the `shadcn` CLI — `add`, `init`, `build`, `create`, `mcp` |
| `pkg/components` | `@hanzo/shadcn` — the same components as a published package |
| `pkg/tests` | integration tests that drive the built CLI against fixture projects |
| `app` | ui.hanzo.ai — the docs site, and `app/registry/**`, the component SOURCE |
| `apps/v4` | the upstream shadcn v4 docs and registry |
| `templates` | the projects `shadcn create` scaffolds |
| `tests` | Playwright e2e of the docs site |
| `skills/shadcn` | the agent skill for the CLI |

Two ways to consume the same components, on purpose. The CLI copies source into
your project so you own and edit it; `@hanzo/shadcn` installs them as a
dependency you upgrade. Same Radix behaviour, same standard shadcn tokens.

## Registry

`app/registry/**` is the source of truth. `pnpm registry:build` compiles it to
the JSON the CLI reads, and the docs site serves it at
`https://ui.hanzo.ai/r/{name}.json`.

The index is `Index[style][name]`, not `Index[name]` — reading it the flat way
renders nothing and reports no error.

Tailwind here is the deliverable, not a defect: these files are what the CLI
hands to customers. Do not "clean up" a registry.

## Develop

```sh
pnpm install
pnpm --filter shadcn build          # the CLI
pnpm --filter @hanzo/shadcn build   # the package
pnpm app:dev                        # the docs site, :3333
pnpm v4:dev                         # the upstream v4 app, :4000
```

## Relationship to @hanzo/ui

`@hanzo/ui@8` is a different library with a different substrate — it renders on
`@hanzo/gui` so one import serves web, native and desktop, and it carries no
Radix and no Tailwind. It lives in [hanzoai/ui](https://github.com/hanzoai/ui).
The shadcn line lives here.

Licensed MIT OR Apache-2.0. Component patterns from
[shadcn/ui](https://github.com/shadcn-ui/ui) under MIT — see `NOTICE`.
