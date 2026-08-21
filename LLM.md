# hanzoai/shadcn — LLM context

**What this is.** Everything shadcn-lineage at Hanzo: the `shadcn` CLI, the
component registry it serves, the two docs sites that publish that registry, and
the `templates/*` projects it scaffolds. Split out of `hanzoai/ui` so each repo
is one thing — `hanzoai/ui` is now `@hanzo/ui@8` on `@hanzo/gui` and nothing
shadcn.

**The repo's root commit is shadcn's** (`2023-01-24 · shadcn · feat: initial
commit`). The history came across per-path with `git filter-repo`, because for
this side the provenance IS the attribution. Keep it.

## Layout

```
shadcn/
  pkg/
    cli/           the `shadcn` CLI (package name `shadcn`, private, bin dist/index.js)
    components/    @hanzo/shadcn — the same components as a published package
    tests/         integration tests; drives the built CLI against fixtures
  app/             ui.hanzo.ai — docs site (@hanzo/ui-web) + app/registry/** SOURCE
  apps/v4/         upstream shadcn v4 docs + registry (port 4000)
  templates/       what `shadcn create` scaffolds (next, vite, astro, react-router, start)
  tests/           Playwright e2e of app/ (port 3333)
  skills/shadcn/   agent skill for the CLI
```

`pkg/*` is the one package root. `templates/*` are NOT workspace members — they
are scaffolds with their own manifests, and globbing them into the workspace
would install eleven starter apps on every `pnpm install`.

## Two doors to the same components, on purpose

| | how you get it | who owns the file |
|---|---|---|
| `npx shadcn add button` | CLI copies source into your project | you do — edit freely |
| `pnpm add @hanzo/shadcn` | normal dependency | we do — you upgrade it |

Same Radix primitives, same standard shadcn tokens (`bg-primary`,
`text-muted-foreground`, …). `@hanzo/shadcn` ships no CSS of its own; it renders
against whatever host defines those variables.

## The registry

`app/registry/**` is the source of truth; `app/__registry__` and `app/public/r`
are generated. The chain is `pnpm registry:build` → `registry:api` →
`next build`, all inside `app/`, and the static export is the site.

- **Index is `Index[style][name]`, not `Index[name]`.** Reading it flat renders
  nothing and raises no error.
- **Tailwind here is the deliverable.** These files are what the CLI hands
  customers. Do not "clean up" a registry.
- **Tailwind reads SOURCE TEXT.** `grid-cols-${n}` never becomes a rule, and the
  failure hides when a neighbouring file spells one literally and lends you its
  rule. A count becomes an inline style; a value off a fixed scale becomes a
  literal lookup table.

**`https://ui.hanzo.ai/r/{name}.json` currently 404s** — the site is live and
serving, but the `/r/` payload is not in the deployed export. `components.json`
and the CLI contract both name that path, so the registry is unreachable to any
consumer configured for `@hanzo`. Pre-existing; not caused by the split.

## The CLI

`pkg/cli`, package name `shadcn`, `private: true` — we do not publish it; it is
upstream's name. It is verbatim upstream: `grep -ri hanzo pkg/cli/src` returns
nothing.

- Default registry is `https://ui.shadcn.com/r`, overridden by `REGISTRY_URL`
  (`src/registry/constants.ts`). Pointing it at ours is a config change, not a
  code change.
- Templates come from `git clone --sparse` of `SHADCN_GITHUB_URL` (default
  `shadcn-ui/ui`) unless `SHADCN_TEMPLATE_DIR` is set — which is what
  `pnpm --filter shadcn start:dev` does. So in production the CLI scaffolds from
  upstream, not from `templates/` here.
- `src/templates/laravel.ts` names `laravel-app`, which has no directory here;
  `templates/monorepo-next` is referenced by nothing. Upstream drift, both.

**`npx @hanzo/ui add button` does not work and never did.** `@hanzo/ui` has no
`bin` — npm answers "could not determine executable to run". The CLI-bearing
published package is `@hanzo/ui-shadcn@5.9.1` (`bin: hanzo-ui`). Do not repeat
the `npx @hanzo/ui add` line in docs.

## How this ships

    push  ->  git.hanzo.ai/hanzoai/shadcn        CANONICAL
              .hanzo/workflows/cicd.yml          the whole pipeline, from hanzo.yml
              .hanzo/workflows/registries.yml    the v4 registry check
      ->  ghcr.io/hanzoai/shadcn                 the ui.hanzo.ai image
      ->  hanzoai/universe                       charts/app/values/hanzo/ui.yaml
                                                 names the tag that is live
        github.com/hanzoai/shadcn                a mirror; it runs nothing

`.hanzo/workflows`, never `.github/workflows` — the forge resolves only the
former, and github.com has no runner for the `hanzo-build-*` labels, so a caller
in the wrong directory is a gate that can never be scheduled.

`app/` is a Next static export; `Dockerfile` copies `app/out` into
`ghcr.io/hanzoai/static`. The ingest key is baked at build from KMS
`deploy/PUBLISHABLE_KEY` via `hanzo.yml`'s `build_secrets` — the only lane that
can supply it — and the Dockerfile fails closed on an empty or `pk_`-prefixed
key, because a keyless static export looks correct and reports nothing.

## The image lane needs one credential this repo does not have yet

`cicd` fails at **"Fetch deploy credentials from KMS"**, and nothing after it
runs. The `images:` block declares `build_secrets: [PUBLISHABLE_KEY]`, so
hanzoai/ci reads KMS `deploy/PUBLISHABLE_KEY` using the runner's machine
identity — and that identity is provisioned on `hanzoai/ui`, where the same step
passes, but not here. Measured on both: same reusable, same step, ui green,
shadcn red.

The fix is repo configuration, not code: give `hanzoai/shadcn` the
`KMS_CLIENT_ID` and `KMS_CLIENT_SECRET` secrets `hanzoai/ui` already has. The
block stays declared because it is where the site is built from now; deleting it
would leave ui.hanzo.ai with no builder in any repo and nothing failing to say
so. The two `test:` gates both pass — `components` (typecheck, build, and the
tarball/exports assertion) and `cli` (build, then run the binary).

Until the credential lands, ui.hanzo.ai keeps serving the digest pinned in
`hanzoai/universe` `charts/app/values/hanzo/ui.yaml`, which still names
`ghcr.io/hanzoai/ui:5.7.7`. Repin it to `ghcr.io/hanzoai/shadcn:<tag>` on the
first green image build — not before, or the pod pulls a tag that does not exist.

## Gotchas

- **`pkg/tests` does not run.** `pnpm --filter tests test` dies in globalSetup
  with `ReferenceError: __vite_ssr_exportName__ is not defined` — the package
  pins `vitest ^2.1.9` and its vite-node cannot read the SSR transform the
  workspace's `vite 8` emits. Measured identical on `hanzoai/ui` at `07d21522b`,
  before this repo existed. Fixing it is a version decision (align the pin, or
  give the package its own vite), so the `cli` gate builds and runs the binary
  and leaves the suite out rather than shipping a gate that cannot pass.
- `scripts/sync-templates.sh` pushes to `github.com/shadcn/<name>` — an org we do
  not control. It is upstream's, manual-only, and running it attempts writes to
  someone else's repos.
- `tests/scripts/*.mjs` and `tests/component-health-check.ts` import `pkgs/ui/…`,
  a path that has not existed for some time. Dead before the split.
- `tests/comprehensive.spec.ts` and `tests/theme-dropdown.spec.ts` hardcode port
  3003; `playwright.config.ts` serves 3333.
