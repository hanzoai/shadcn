// Prepend `'use client';` to every compiled JS file in dist.
//
// Every component here uses React hooks and/or Radix portals, so every module is a
// client module. tsup's `banner` is unreliable with code splitting and Next's
// flight-client loader needs the directive to be the FIRST statement — so stamp it
// deterministically, post-build.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const DIRECTIVE = "'use client';\n"

let n = 0
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(c?js|mjs)$/.test(name)) {
      const src = readFileSync(p, 'utf8')
      if (!/^['"]use client['"]/.test(src)) {
        writeFileSync(p, DIRECTIVE + src)
        n++
      }
    }
  }
}

walk(DIST)
console.log(`stamped 'use client' across ${n} dist file(s)`)
