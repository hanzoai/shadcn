import { defineConfig } from 'tsup'

// Ship COMPILED JS (ESM + CJS) so consumers never transpile our source. Next's
// flight-client loader parses `'use client'` modules out of node_modules WITHOUT
// TypeScript — raw `.tsx` crashes it. Compiled JS has the types stripped and keeps
// the directive (stamped post-build by scripts/use-client.mjs, because tsup's
// `banner` misses split chunks).
//
// `.d.ts` comes from tsc, not tsup — see tsconfig.build.json.
//
// Every runtime dep is external: React must be the host's copy (hooks break across
// two Reacts) and so must next-themes (the Toaster's useTheme has to read the SAME
// provider context the host rendered).
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  target: 'es2022',
  sourcemap: true,
  clean: true,
  dts: false,
  splitting: false,
  treeshake: true,
  external: [/^@radix-ui\//, /^react($|\/)/, /^react-dom($|\/)/, 'next-themes', 'sonner', 'cmdk', 'lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
})
